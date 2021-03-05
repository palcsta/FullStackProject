const aCodes = [ "ae","af","al","am","ao","ar","at","au","az","ba","bd","be","bf","bg","bi","bj","bn","bo","br","bs","bt","bw","by","bz","ca","cd","cf","cg","ch","ci","cl","cm","cn","co","cr","cu","cv","cy","cz","de","dk","dj","dm","do","dz","ec","ee","eg","er","es","et","fi","fk","fr","ga","gb","ge","gh","gl","gm","gn","gq","gr","gt","gw","gy","hn","hr","ht","hu","id","ie","il","in","iq","ir","is","it","jm","jo","jp","ke","kg","kh","km","kp","kr","kw","kz","la","lb","lc","lk","lr","ls","lt","lu","lv","ly","ma","md","me","mg","mk","ml","mm","mn","mr","mt","mu","mv","mw","mx","my","mz","na","nc","ne","ng","ni","nl","no","np","nz","om","pa","pe","pg","ph","pk","pl","pr","pt","py","qa","ro","rs","ru","rw","sa","sb","sc","sd","se","sg","si","sk","sl","sn","so","sr","ss","st","sv","sy","sz","td","tg","th","tj","tm","tn","tr","tt","tw","tz","ua","ug","us","uy","uz","vc","ve","vn","vu","ye","za","zm","zw" ]

const containsOnlyAlphaCodes = countryList => {
  if(Array.isArray(countryList)){
  console.log("checking countrylist of length ",countryList.length)
    const filteredCountryList = countryList.filter(country => aCodes.includes(country))
    console.log("filtered countrylist was of length ", filteredCountryList.length)
    return ( filteredCountryList.length === countryList.length )
  } 
  console.log("countrylist wasn't an array!")
  return false
}

module.exports = containsOnlyAlphaCodes
