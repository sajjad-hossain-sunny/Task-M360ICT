import { FC, useEffect, useState } from "react"
import { useGetCategoriesQuery } from "../../services/CategoriesApi";


const CustomSelect: FC = () => {
  const { data: categories = [], error, isLoading } = useGetCategoriesQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
  };

  useEffect(() => {
    console.log(selectedCategory);

  }, [selectedCategory])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching categories</div>;
  return (
    <div>
      <label htmlFor="category-select">Select a Category:</label>
      <select id="category-select" value={selectedCategory} onChange={handleSelectChange}>
        <option value="">--Please choose an option--</option>
        {categories.map(({ name, slug }) => (
          <option key={name} value={slug}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect