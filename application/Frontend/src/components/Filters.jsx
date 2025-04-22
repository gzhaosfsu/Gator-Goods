import React from "react"

const Filters = ({
      filters = { condition: "", priceSort: "", datePosted: "", minDiscount: "", minRating: "" },
      setFilters = () => {}
    }) => {
  const handleCondition = e => {
    setFilters({ ...filters, condition: e.target.value })
  }
  const handlePriceSort = e => {
    setFilters({ ...filters, priceSort: e.target.value })
  }
  const handleDatePosted  = e => {
    setFilters({ ...filters, datePosted: e.target.value })
  }
  const handleDiscount  = e => {
    setFilters({ ...filters, minDiscount: e.target.value })
  }
  const handleMinRating  = e =>{
    setFilters({ ...filters, minRating: e.target.value })
  }    
  return (
    <div className="filters-container">
      <select value={filters.condition} onChange={handleCondition}>
        <option value="">All Conditions</option>
        <option value="New">New</option>
        <option value="Used - Like New">Used - Like New</option>
        <option value="Used - Good">Used - Good</option>
        <option value="Used - Fair">Used - Fair</option>
      </select>

      <select value={filters.priceSort} onChange={handlePriceSort}>
        <option value="">Sort by Price</option>
        <option value="low-to-high">Low → High</option>
        <option value="high-to-low">High → Low</option>
      </select>

      <select value={filters.datePosted} onChange={handleDatePosted}>
        <option value="">Any time</option>
        <option value="24h">Past 24 hours</option>
        <option value="7d">Past 7 days</option>
        <option value="30d">Past 30 days</option>
      </select>

      <select value={filters.minDiscount} onChange={handleDiscount}>
        <option value="">Any discount</option>
        <option value="10">10% or more</option>
        <option value="25">25% or more</option>
        <option value="50">50% or more</option>
      </select>
 
      <select value={filters.minRating} onChange={handleMinRating}>
        <option value="">Any rating</option>
        <option value="4">4 ★ & up</option>
        <option value="3">3 ★ & up</option>
        <option value="2">2 ★ & up</option>
        <option value="1">1 ★ & up</option>
      </select>
    </div>
  )
}

export default Filters
