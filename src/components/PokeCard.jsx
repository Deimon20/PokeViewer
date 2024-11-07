export function PokeCard({name, id, weight, defaultIMG, shinyIMG, types}){
    const parsedWeight = weight / 10
    const shiny = shinyIMG
    const typesArray = types

    return(
        <article className="pk-card">
            <h2>{name}</h2>
            <h3>{id}</h3>
            <img src={shiny} alt={`default front image from ${name}`}/>
            <p>Weight: {parsedWeight} kg.</p>
        </article>
    )
}