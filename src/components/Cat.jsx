function Cat({ open }) {
    return (
        <img
            src={`cat-${open ? 'open' : 'closed'}.svg`} 
            width= '100%'
            height= '100%'
        />
    )

}

export default Cat;