export default async function fetchGET(url){
	return await fetch(url).then(res => res.text())
}