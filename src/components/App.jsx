import { useEffect, useState } from 'react'

// Advanced CSS styling with more sophisticated design
const AppStyles = {
  container: "min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
  backgroundOverlay: "absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-yellow-500/10",
  floatingShapes: "absolute inset-0 overflow-hidden pointer-events-none",
  shape1: "absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse",
  shape2: "absolute top-1/3 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse",
  shape3: "absolute bottom-10 left-1/3 w-80 h-80 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse",
  content: "relative z-10 py-12 px-4",
  header: "text-center mb-16 relative",
  titleContainer: "relative inline-block",
  title: "text-7xl md:text-8xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl tracking-tight leading-none",
  titleGlow: "absolute inset-0 text-7xl md:text-8xl font-black text-orange-400/20 blur-sm animate-pulse",
  subtitle: "text-xl md:text-2xl text-gray-300 font-light tracking-wide max-w-2xl mx-auto leading-relaxed",
  accentLine: "w-32 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto mt-8 rounded-full shadow-lg shadow-orange-500/50",
  searchSection: "max-w-4xl mx-auto mb-20 relative",
  formContainer: "relative group",
  formGlow: "absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200",
  formInner: "relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-10 border border-gray-700/50 shadow-2xl",
  searchGrid: "flex flex-col lg:flex-row gap-6 items-end",
  inputContainer: "flex-1 relative group",
  inputLabel: "block text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider",
  inputWrapper: "relative",
  inputField: "w-full px-8 py-6 text-xl bg-gray-800/80 backdrop-blur-sm border-2 border-gray-600/50 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all duration-500 text-white placeholder-gray-400 shadow-inner group-hover:border-gray-500/70",
  inputGlow: "absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500",
  submitContainer: "relative",
  submitButton: "relative overflow-hidden px-12 py-6 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white text-xl font-bold rounded-2xl hover:from-orange-600 hover:via-red-600 hover:to-orange-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 border border-orange-400/30 group cursor-pointer",
  submitGlow: "absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  submitText: "relative z-10 tracking-wide",
  resultsSection: "max-w-8xl mx-auto",
  main: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4",
  loadingContainer: "col-span-full text-center py-20",
  loadingSpinner: "inline-flex items-center justify-center space-x-2 mb-6",
  loadingDot: "w-4 h-4 rounded-full animate-bounce",
  loadingText: "text-2xl text-gray-300 font-light tracking-wide",
  emptyState: "col-span-full text-center py-20",
  emptyIcon: "text-8xl mb-6 opacity-50",
  emptyTitle: "text-3xl font-bold text-gray-400 mb-4",
  emptySubtitle: "text-xl text-gray-500 max-w-md mx-auto"
}

const FoodItemStyles = {
  itemsCont: "group relative",
  cardGlow: "absolute -inset-1 bg-gradient-to-br from-orange-500/30 via-red-500/30 to-yellow-500/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-all duration-500",
  recipe: "relative bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl hover:shadow-orange-500/20 transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 group-hover:border-orange-500/30",
  imageContainer: "relative overflow-hidden h-64 group",
  image: "w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 brightness-90 group-hover:brightness-110",
  imageOverlay: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity duration-500",
  imageGlow: "absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  content: "p-8 relative",
  titleContainer: "mb-6 relative",
  title: "text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors duration-300 leading-tight",
  titleGlow: "absolute inset-0 text-2xl font-bold text-orange-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  nutrientsContainer: "space-y-4 opacity-0 max-h-0 overflow-hidden transition-all duration-700 ease-in-out transform translate-y-4",
  nutrientsContainerVisible: "opacity-100 max-h-96 translate-y-0",
  nutrientsHeader: "text-sm font-bold text-orange-400 uppercase tracking-widest mb-6 relative",
  nutrientsHeaderGlow: "absolute inset-0 text-orange-400/30 blur-sm",
  nutrientsList: "space-y-3 list-none p-0 m-0",
  nutrientItem: "flex justify-between items-center py-4 px-5 bg-gray-800/60 backdrop-blur-sm rounded-xl hover:bg-orange-500/10 transition-all duration-300 border border-gray-700/30 hover:border-orange-500/30 group/item",
  nutrientLabel: "text-gray-300 font-medium tracking-wide group-hover/item:text-white transition-colors duration-300",
  nutrientValue: "text-orange-400 font-bold text-lg bg-gray-900/80 px-4 py-2 rounded-lg shadow-lg border border-orange-500/20 group-hover/item:bg-orange-500/20 group-hover/item:text-white transition-all duration-300",
  floatingElements: "absolute top-4 right-4 space-y-2",
  floatingDot: "w-3 h-3 bg-gradient-to-br from-orange-400 to-red-400 rounded-full shadow-lg shadow-orange-500/50 animate-pulse",
  nutritionBtn: "bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer border border-orange-400/30 mb-4 group/btn"
}

const Fooditems = (props) => {
  const [showNutrition, setShowNutrition] = useState(false);

  return (
    <div className={FoodItemStyles.itemsCont}>
      <div className={FoodItemStyles.cardGlow}></div>
      <div className={FoodItemStyles.recipe}>
        <div className={FoodItemStyles.imageContainer}>
          <img 
            src={props.item.food.image} 
            className={FoodItemStyles.image} 
            alt={props.item.food.label} 
          />
          <div className={FoodItemStyles.imageOverlay}></div>
          <div className={FoodItemStyles.imageGlow}></div>
          <div className={FoodItemStyles.floatingElements}>
            <div className={FoodItemStyles.floatingDot}></div>
            <div className={FoodItemStyles.floatingDot} style={{animationDelay: '0.5s'}}></div>
            <div className={FoodItemStyles.floatingDot} style={{animationDelay: '1s'}}></div>
          </div>
        </div>
        
        <div className={FoodItemStyles.content}>
          <div className={FoodItemStyles.titleContainer}>
            <div className={FoodItemStyles.titleGlow}>{props.item.food.label}</div>
            <h3 className={FoodItemStyles.title}>
              {props.item.food.label}
            </h3>
          </div>

          <div 
            className={FoodItemStyles.nutritionBtn}
            onMouseEnter={() => setShowNutrition(true)}
            onMouseLeave={() => setShowNutrition(false)}
          >
            View Nutrition Facts 📊
          </div>

          <div className={`${FoodItemStyles.nutrientsContainer} ${showNutrition ? FoodItemStyles.nutrientsContainerVisible : ''}`}>
            <div className="relative">
              <div className={FoodItemStyles.nutrientsHeaderGlow}>Nutritional Values</div>
              <span className={FoodItemStyles.nutrientsHeader}>Nutritional Values</span>
            </div>
            
            <ul className={FoodItemStyles.nutrientsList}>
              <li className={FoodItemStyles.nutrientItem}>
                <span className={FoodItemStyles.nutrientLabel}>Carbohydrates</span>
                <span className={FoodItemStyles.nutrientValue}>
                  {props.item.food.nutrients.CHOCDF ? `${Math.round(props.item.food.nutrients.CHOCDF * 10) / 10}g` : 'N/A'}
                </span>
              </li>
              <li className={FoodItemStyles.nutrientItem}>
                <span className={FoodItemStyles.nutrientLabel}>Calories</span>
                <span className={FoodItemStyles.nutrientValue}>
                  {props.item.food.nutrients.ENERC_KCAL ? `${Math.round(props.item.food.nutrients.ENERC_KCAL)}kcal` : 'N/A'}
                </span>
              </li>
              <li className={FoodItemStyles.nutrientItem}>
                <span className={FoodItemStyles.nutrientLabel}>Fat</span>
                <span className={FoodItemStyles.nutrientValue}>
                  {props.item.food.nutrients.FAT ? `${Math.round(props.item.food.nutrients.FAT * 10) / 10}g` : 'N/A'}
                </span>
              </li>
              <li className={FoodItemStyles.nutrientItem}>
                <span className={FoodItemStyles.nutrientLabel}>Fiber</span>
                <span className={FoodItemStyles.nutrientValue}>
                  {props.item.food.nutrients.FIBTG ? `${Math.round(props.item.food.nutrients.FIBTG * 10) / 10}g` : 'N/A'}
                </span>
              </li>
              <li className={FoodItemStyles.nutrientItem}>
                <span className={FoodItemStyles.nutrientLabel}>Protein</span>
                <span className={FoodItemStyles.nutrientValue}>
                  {props.item.food.nutrients.PROCNT ? `${Math.round(props.item.food.nutrients.PROCNT * 10) / 10}g` : 'N/A'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export const App = () => {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('pizza,chowmein,pasta');
    const [fooditems, setFooditems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Your exact original API configuration
    const appId = import.meta.env.VITE_EDAMAM_APP_ID;
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY;

    // Enhanced useEffect with loading state
    useEffect(() => {
        const getData = async () => {
            if (!query) return;
            
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=${appId}&app_key=${appKey}`);

                if (!response.ok) throw new Error(`API request failed with status ${response.status}`);

                const parsedData = await response.json();
                console.log(parsedData);
                console.log(parsedData.hints);
                setFooditems(parsedData.hints || []);
                console.log('data fetched');

            } catch (error) {
                console.error(`Fetching error: ${error}`);
                setFooditems([]);
            } finally {
                setIsLoading(false);
            }
        }
        getData()
    }, [query])

    // Your exact original handleSubmit function
    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return (
        <div className={AppStyles.container}>
            <div className={AppStyles.backgroundOverlay}></div>
            
            {/* Floating background shapes */}
            <div className={AppStyles.floatingShapes}>
                <div className={AppStyles.shape1}></div>
                <div className={AppStyles.shape2}></div>
                <div className={AppStyles.shape3}></div>
            </div>

            <div className={AppStyles.content}>
                {/* Enhanced Header */}
                <div className={AppStyles.header}>
                    <div className={AppStyles.titleContainer}>
                        <div className={AppStyles.titleGlow}>FoodiePedia 🍽️</div>
                        <h1 className={AppStyles.title}>
                            FoodiePedia 🍽️
                        </h1>
                    </div>
                    <p className={AppStyles.subtitle}>
                        Discover the nutritional secrets of your favorite foods with our advanced search engine. 
                        Explore calories, proteins, fats, and more in stunning detail.
                    </p>
                    <div className={AppStyles.accentLine}></div>
                </div>
                
                {/* Enhanced Search Section */}
                <div className={AppStyles.searchSection}>
                    <div className={AppStyles.formContainer}>
                        <div className={AppStyles.formGlow}></div>
                        <div className={AppStyles.formInner}>
                            <div className={AppStyles.searchGrid}>
                                <div className={AppStyles.inputContainer}>
                                    <label className={AppStyles.inputLabel}>Search Food Items</label>
                                    <div className={AppStyles.inputWrapper}>
                                        <div className={AppStyles.inputGlow}></div>
                                        <input 
                                            type="text" 
                                            value={search} 
                                            onChange={event => setSearch(event.target.value)} 
                                            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                                            className={AppStyles.inputField}
                                            placeholder='Enter food name (e.g., pasta, apple, chicken)...' 
                                        />
                                    </div>
                                </div>
                                
                                <div className={AppStyles.submitContainer}>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className={AppStyles.submitButton}
                                    >
                                        <div className={AppStyles.submitGlow}></div>
                                        <span className={AppStyles.submitText}>
                                            {isLoading ? 'Searching...' : 'Discover'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Enhanced Results Section */}
                <div className={AppStyles.resultsSection}>
                    <div className={AppStyles.main}>
                        {isLoading ? (
                            <div className={AppStyles.loadingContainer}>
                                <div className={AppStyles.loadingSpinner}>
                                    <div className={`${AppStyles.loadingDot} bg-orange-500`}></div>
                                    <div className={`${AppStyles.loadingDot} bg-red-500`} style={{animationDelay: '0.1s'}}></div>
                                    <div className={`${AppStyles.loadingDot} bg-yellow-500`} style={{animationDelay: '0.2s'}}></div>
                                    <div className={`${AppStyles.loadingDot} bg-orange-500`} style={{animationDelay: '0.3s'}}></div>
                                </div>
                                <p className={AppStyles.loadingText}>Discovering delicious food data...</p>
                            </div>
                        ) : fooditems.length > 0 ? (
                            fooditems.map((item, index) => (
                                <Fooditems item={item} key={index} />
                            ))
                        ) : query && !isLoading ? (
                            <div className={AppStyles.emptyState}>
                                <div className={AppStyles.emptyIcon}>🔍</div>
                                <h3 className={AppStyles.emptyTitle}>No results found</h3>
                                <p className={AppStyles.emptySubtitle}>
                                    We couldn't find any food items matching "{query}". Try searching for something else!
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}