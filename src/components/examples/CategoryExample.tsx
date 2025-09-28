'use client'

import { useI18n } from '@/hooks/useI18n'
import { Database } from '@/types/database.types'

type Category = Database['public']['Tables']['categories']['Row']

interface CategoryExampleProps {
  category: Category
}

export function CategoryExample({ category }: CategoryExampleProps) {
  const { categoryT, t } = useI18n()

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{category.icon}</span>
        <h3 className="font-semibold">
          {categoryT(category.name)} {/* Traduce usando la key */}
        </h3>
      </div>
      
      <p className="text-gray-600 mb-2">
        {categoryT(category.name, 'description')}
      </p>
      
      <div className="flex justify-between items-center text-sm">
        <span className={`px-2 py-1 rounded text-white ${
          category.type === 'income' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {t(`transactions.${category.type}`)}
        </span>
        
        <button className="text-blue-500 hover:underline">
          {t('common.edit')}
        </button>
      </div>
    </div>
  )
}

// Ejemplo de uso en una lista de categorías
export function CategoryList() {
  const { t, locale, setLocale } = useI18n()

  // Ejemplo de cómo cambiar idioma
  const toggleLanguage = () => {
    setLocale(locale === 'es' ? 'en' : 'es')
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {t('categories.title', 'Categories')}
        </h2>
        
        <button 
          onClick={toggleLanguage}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          {locale === 'es' ? 'English' : 'Español'}
        </button>
      </div>
      
      {/* Aquí irían las categorías */}
      <p className="text-gray-500">
        {t('common.loading')}
      </p>
    </div>
  )
}