function Cat({ open }) {
    return (
        <img
            src={`cat-${open ? 'open' : 'closed'}.svg`} 
            width={70}
            height={70}
        />
    )

}

export default Cat;