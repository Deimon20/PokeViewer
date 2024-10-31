export function GenButton({genNumber, isSelected}){
    const genConversion = {
        "1": "I",
        "2": "II",
        "3": "III",
        "4": "IV",
        "5": "V",
        "6": "VI",
        "7": "VII",
        "8": "VIII",
        "9": "IX"
    }

    return (
        <img 
        src={`src\\assets\\pokemonGenSVG\\gen-${genNumber}.svg`} 
        alt={`${genConversion[genNumber]} Generation`}
        className={isSelected ? 'selected' : ''}
        data-gen={genNumber}
        />
    )
}