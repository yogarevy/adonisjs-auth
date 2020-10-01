'use strict'

// @ts-ignore
const BaseMapper = use('App/Services/Mapper/BaseMapper')

class MapperService {
    /**
     * @param {BaseMapper} mapper
     * @param paged
     * @param {String} countAll
     * @param {String} method
     * @param {Number} code
     * @param {Array} additional
     * @param {String} url
     */
    list(
        mapper,
        paged,
        countAll,
        method,
        url,
        // @ts-ignore
        code = 200,
        additional = []
    ) {
        let version = '1.0.1'
        let message = 'Request is successfully executed.'
        let errors = []
        let item = []
        let items = mapper.list(paged.rows)
        let meta = this.meta(code, version, method, message)
        let pageInfo = this.pageInfo(
            paged.pages.total,
            paged.pages.perPage,
            paged.pages.page,
            paged.pages.lastPage,
            countAll,
            url
        )
        
        let data = {
            message: message,
            item: Object.assign({}, item),
            items: items,
            additional: additional
        }

        let respon = {
            meta: meta,
            page_info: pageInfo,
            errors: errors,
            data: data
        }

        return respon
    }

    /**
     * @param {BaseMapper} mapper
     * @param single
     * @param {String} method
     * @param {Number} code
     * @param {Array} additional
     * @param {String} url
     */
    single(
        mapper,
        single,
        method,
        url,
        // @ts-ignore
        code = 200,
        additional = []
    ) {
        let version = '1.0.1'
        let message = 'Request is successfully executed.'
        let errors = []
        let items = []
        let item = mapper.single(single)
        let meta = this.meta(code, version, method, message)
        let pageInfo = this.pageInfo(
            '1',
            1,
            1,
            1,
            '1',
            url
        )
        
        let data = {
            message: message,
            item: Object.assign({}, item),
            items: items,
            additional: additional
        }

        let respon = {
            meta: meta,
            page_info: pageInfo,
            errors: errors,
            data: data
        }

        return respon
    }

    /**
     * @param errorMessage
     * @param {String} method
     * @param {Number} code
     * @param {Array} additional
     * @param {String} url
     */
    error(
        errorMessage,
        method,
        url,
        // @ts-ignore
        code,
        additional = []
    ) {
        let version = '1.0.1'
        let message = errorMessage
        let errors = [
            {errors: errorMessage}
        ]
        let items = []
        let item = []
        let meta = this.meta(code, version, method, message)
        let pageInfo = this.pageInfo(
            '1',
            1,
            1,
            1,
            '1',
            url
        )
        
        let data = {
            message: message,
            item: Object.assign({}, item),
            items: items,
            additional: additional
        }

        let respon = {
            meta: meta,
            page_info: pageInfo,
            errors: errors,
            data: data
        }

        return respon
    }

    /**
     * @param validation
     * @param {String} method
     * @param {Number} code
     * @param {Array} additional
     * @param {String} url
     */
    validation(
        validation,
        method,
        url,
        // @ts-ignore
        code = 422,
        additional = []
    ) {
        let version = '1.0.1'
        let message = 'Oops... Something went wrong.'
        let messageBag = validation
        let errors = messageBag.message
        let items = []
        let item = []
        let meta = this.meta(code, version, method, message)
        let pageInfo = this.pageInfo(
            '1',
            1,
            1,
            1,
            '1',
            url
        )
        
        let data = {
            message: message,
            item: Object.assign({}, item),
            items: items,
            additional: additional
        }

        let respon = {
            meta: meta,
            page_info: pageInfo,
            errors: errors,
            data: data
        }

        return respon
    }

    /**
    * @param {String} url
    * @param {String} total
    * @param {Number} perPage
    * @param {Number} page
    * @param {Number} lastPage
    * @param {String} count
    */
    pageInfo(
        total = '1',
        perPage = 1,
        page = 1,
        lastPage = 1,
        count = '1',
        url
    )
    {
        return {
            total: total,
            per_page: perPage,
            page: page,
            last_page: lastPage,
            count: count,
            url: url
        }
    }

    /**
    * @param {Number} code
    * @param {String} version
    * @param {String} method
    * @param {String} message
    */
    meta(code, version, method, message)
    {
        return {
            code: code,
            api_version: version,
            method: method,
            message: message
        }
    }

}

module.exports = MapperService