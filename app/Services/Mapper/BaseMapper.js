'use strict'

class BaseMapper {
  /**
  * Loop through single() function to generate multiple mapped data.
  *
  * @param items
  * @return array
  */
  list(items)
  {
    let result = [];
    for(let i in items.rows){
      result.push(this.single(items.rows[i]))
    }

    return result;
  }

  /**
  * Mapper class must implement this function in order to make list() function work.
  *
  * @param item
  * @return mixed
  */
  single(item){}
}

module.exports = BaseMapper