export const integerPattern = /^[0-9]+$/
export const floatPattern = /(^[1-9][0-9]*(\.[0-9]+)?$)|(^[0-9](\.[0-9]+)?$)/
// 數字or英文
export const integerAndEnglishPatternSoft = /^[0-9a-zA-Z]+$/

// 非負小數且允許'10.'
export const floatPatternSoft = /(^[1-9][0-9]*(\.[0-9]*)?$)|(^[0-9](\.[0-9]*)?$)/
// 小數且允許不完整小數&負號,ex: '-','10.','-10.'
// eslint-disable-next-line no-useless-escape
export const floatPatternSoftNega = /(^\-?[1-9][0-9]*(\.[0-9]*)?$)|(^\-?[0-9](\.[0-9]*)?$)|(^\-$)/

export const ipPattern = /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/gi
