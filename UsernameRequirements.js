const logger = require('./utils/logger')

const minLen = 1
const maxLen = 50

const hasLeadingOrTrailingWhitespace = string => {
  const regex= /^\s|\s$/ 
  return regex.test(string)
}

const hasConcurrentWhiteSpace = string => {
  const regex = /\s\s/
  return regex.test(string)
}

const hasDisallowedChars = string => {
  const stringNoSpecialChars = string.replace(/[^\w\söäå]/gi, '')
  return string !== stringNoSpecialChars
}

const checker = username => {
  const res = {ok:true,problems:[]}
  if(username.length<minLen) res.problems.push(`Username too short (minimum length: ${minLen})`)
  if(username.length>maxLen) res.problems.push(`Username too long (maximum length: ${maxLen})`)
  if(hasLeadingOrTrailingWhitespace(username)) res.problems.push('Username must not include trailing or leading spaces')
  if(hasConcurrentWhiteSpace(username)) res.problems.push('Username must not include concurrent spaces')
  if(hasDisallowedChars(username)) res.problems.push('Username must consist of alphanumerics and/ or spaces')
  res.ok = res.problems.length<1
  return res
}

module.exports = checker
