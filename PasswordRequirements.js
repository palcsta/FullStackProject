const minLen = 8
const maxLen = 50

const hasLowerCase = string => {
  return string.normalize().toUpperCase() !== string.normalize()
}

const hasUpperCase = string => {
  return string.normalize().toLowerCase() !== string.normalize()
}

const checker = password => {
  let res = {ok:true,problems:[]}
  if(password.length<minLen) res.problems.push(`Password too short (minimum length: ${minLen})`)
  if(password.length>maxLen) res.problems.push(`Password too long (maximum length: ${maxLen})`)
  if(!hasLowerCase(password)) res.problems.push('Password must include at least one lowercase letter')
  if(!hasUpperCase(password)) res.problems.push('Password must include at least one uppercase letter')
  res.ok = res.problems.length<1
  res.problems = res.problems.map(p=>{return {error:p,concerning:"password"}})
  return res
}

module.exports = checker
