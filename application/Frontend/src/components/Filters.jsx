import React from "react"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"

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
      <div className="select-wrapper">
        <select value={filters.condition} onChange={handleCondition}>
          <option value="">Condition</option>
          <option value='New'>New</option>
          <option value="Used - Like New">Used - Like New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">Used - Fair</option>
        </select>
        <ArrowDownwardIcon className="select-icon" />
      </div>  

      <div className="select-wrapper">
        <select value={filters.priceSort} onChange={handlePriceSort}>
          <option value="">Sort by Price</option>
          <option value="low-to-high">Low → High</option>
          <option value="high-to-low">High → Low</option>
        </select>
        <ArrowDownwardIcon className="select-icon" />
      </div>

      <div className="select-wrapper">
        <select value={filters.datePosted} onChange={handleDatePosted}>
          <option value="">Sort by Time</option>
          <option value="24h">Past 24 hours</option>
          <option value="7d">Past 7 days</option>
          <option value="30d">Past 30 days</option>
        </select>
        <ArrowDownwardIcon className="select-icon" />
      </div>

      <div className="select-wrapper">
        <select value={filters.minDiscount} onChange={handleDiscount}>
          <option value="">Discounts</option>
          <option value="10">10% or more</option>
          <option value="25">25% or more</option>
          <option value="50">50% or more</option>
        </select>
        <ArrowDownwardIcon className="select-icon" />
      </div>

      <div className="select-wrapper">
        <select value={filters.minRating} onChange={handleMinRating}>
          <option value="">Vendor Rating</option>
          <option value="4">4 ★ & up</option>
          <option value="3">3 ★ & up</option>
          <option value="2">2 ★ & up</option>
          <option value="1">1 ★ & up</option>
        </select>
        <ArrowDownwardIcon className="select-icon" />
      </div>
    </div>
  )
}

export default Filters
