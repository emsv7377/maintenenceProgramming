/**
 * File: Cat.jsx 
 * 
 * This file returns returns a pictures of the cat, depending on the open state
 * 
 * Version: 1.0 
 * Authors: Michaela Nordness, Agnes Sidemo, Emmy Svensson 
 */
function Cat({ open }) { //open in this case refers to a certain position of the cats legs
    return (
        <img
            src={`cat-${open ? 'open' : 'closed'}.svg`} 
            width= '100%'
            height= '100%'
        />
    )

}

export default Cat;