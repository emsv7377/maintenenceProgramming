function Rat({ open }) {

    return(
        <img 
        src={`rat-${open ? 'open' : 'closed'}.svg`}
        alt="rat2"
        style={{
            width: '100%',
            height: '100%'
        }}
        />
    )
}

export default Rat;