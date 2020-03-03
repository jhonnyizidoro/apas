const isElement = element => element instanceof Element || element instanceof HTMLDocument || window.self === element
const isNodeList = nodeList => nodeList instanceof NodeList && nodeList.length > 0
const isArray = array => array instanceof Array && array.length > 0

export {
	isElement,
	isNodeList,
	isArray,
}