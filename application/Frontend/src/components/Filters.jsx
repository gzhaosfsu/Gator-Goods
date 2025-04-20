import React from "react"

const Filters = ({
      filters = { condition: "", priceSort: "" },
      setFilters = () => {}
    }) => {
  const handleCondition = e => {
    setFilters({ ...filters, condition: e.target.value })
  }
  const handlePriceSort = e => {
    setFilters({ ...filters, priceSort: e.target.value })
  }

  return (
    <div className="filters-container">
      <select value={filters.condition} onChange={handleCondition}>
        <option value="">All Conditions</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select>

      <select value={filters.priceSort} onChange={handlePriceSort}>
        <option value="">Sort by Price</option>
        <option value="low-to-high">Low → High</option>
        <option value="high-to-low">High → Low</option>
      </select>
    </div>
  )
}

export default Filters
