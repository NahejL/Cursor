
export default function Cursor( ...arrays ) {
  return Object.create( Cursor.prototype, {
    cursors: { value: arrays.map( array => ({
      array, index: 0,
      }) ) }
    } ) }
    
Cursor.prototype = {
  constructor: Cursor,
  *[Symbol.iterator]() {
    
    const { cursors } = this
    const last = cursors.at(-1)
    // permutatibg with a zero-cardinality is a zero set
    if( cursors.some( ({ array: { length } }) => 
      length <= 0 ) ) {
      return }
    
    yields: // while true ?!?!
    while( last.index < last.array.length ) {
      // log("yeild")
      
      const result = Array.from(cursors)
      let carry = true 
      
      cursors: 
      for( const [ index, cursor ]
        of cursors.entries() ) {
        
        result[index] = cursor.array[cursor.index]
        
        if( carry ) {
          cursor.index++
          
          if( cursor.index >= cursor.array.length )
            cursor.index = 0
          else
            carry = false
          
          }
        
        }
      
      yield result
      
      if( carry ) 
        break yields
      
      }
      
    },
    
  [Symbol.toPrimitive]() {
    return "Cursor [ " 
      + this.cursors.map( ({ array, index }) => {
        
          return index
          } )
        .join()
      + " ]"
    }
    
  }
