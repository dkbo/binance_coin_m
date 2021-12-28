/* eslint-disable */
/**
 * 去除重複項
 */
Array.prototype.unique = function() {
    return Array.from(new Set(this))
}

/**
 * 數字經度處理
 */
Number.prototype.strip = function() {
    return +parseFloat(this.toPrecision(12))
}