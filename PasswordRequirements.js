const minLen = 8
const maxLen = 50

const hasLowerCase = string => {
  return string.normalize().toUpperCase() !== string.normalize()
}

const hasUpperCase = string => {
  return string.normalize().toLowerCase() !== string.normalize()
}

const checker = password => {
  const res = {ok:true,problems:[]}
  if(password.length<=minLen) res.problems.push('password too short')
  if(password.length>=maxLen) res.problems.push('password too long')
  if(!hasLowerCase(password)) res.problems.push('password must include at least one lowercase letter')
  if(!hasUpperCase(password)) res.problems.push('password must include at least one uppercase letter')
  res.ok = res.problems.length<1
  return res
}

module.exports = checker
