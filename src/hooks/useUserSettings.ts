'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserSettings, UpdateUserSettingsInput } from '@/types/models/UserSettings'

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  // Load user settings
  const loadSettings = async () => {
    try {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setError('Usuario no autenticado')
        return
      }

      const { data, error: settingsError } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError
      }

      if (data) {
        setSettings(data as UserSettings)
      } else {
        // Create default settings if none exist
        await createDefaultSettings(user.id)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar configuraciones')
    } finally {
      setLoading(false)
    }
  }

  // Create default settings
  const createDefaultSettings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .insert([{ user_id: userId }])
        .select()
        .single()

      if (error) throw error
      setSettings(data as UserSettings)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear configuraciones')
    }
  }

  // Update settings
  const updateSettings = async (updates: UpdateUserSettingsInput) => {
    try {
      if (!settings) return

      const { data, error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', settings.user_id)
        .select()
        .single()

      if (error) throw error
      setSettings(data as UserSettings)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar configuraciones')
      throw err
    }
  }

  // Update single setting
  const updateSetting = async <K extends keyof UserSettings>(
    key: K, 
    value: UserSettings[K]
  ) => {
    return updateSettings({ [key]: value } as UpdateUserSettingsInput)
  }

  // Get setting value with fallback
  const getSetting = <K extends keyof UserSettings>(
    key: K, 
    fallback?: UserSettings[K]
  ): UserSettings[K] | undefined => {
    return settings?.[key] ?? fallback
  }

  // Specific getters for common settings
  const getTheme = () => getSetting('theme', 'system')
  const getLanguage = () => getSetting('language', 'es')
  const getCurrency = () => getSetting('default_currency', 'MXN')
  const getTimezone = () => getSetting('timezone', 'America/Mexico_City')

  useEffect(() => {
    loadSettings()
  }, [])

  return {
    settings,
    loading,
    error,
    updateSettings,
    updateSetting,
    getSetting,
    getTheme,
    getLanguage,
    getCurrency,
    getTimezone,
    reload: loadSettings
  }
}