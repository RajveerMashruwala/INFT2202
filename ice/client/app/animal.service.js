/*
 *  Since we are using the regular function keyword, 
 *   we can export our service instance up here.
 */
export default new AnimalService({
    host: 'https://inft2202-server.onrender.com/',
    // host: 'http://localhost:3090',
    user: '100911307'
});

/*
 *  Constructor
 */
function AnimalService({ host, user }) {
    this.host = host;
    this.headers = new Headers({
        user
    });
}

/*
 *
 */
AnimalService.prototype.findAnimal = async function(name)
{
}
/*
 *
 */
AnimalService.prototype.getAnimalPage = async function({ page = 1, perPage = 8 }) 
{
    const params = new URLSearchParams({ page, perPage });
    const url = new URL(`/api/animals?${params.toString()}`, this.host);
    const req = new Request(url, {
        headers: this.headers,
        method: 'GET',
    });
    try {
        const res = await fetch(req);
        return res.json();
    } catch (err) {
        return false;
    }
}

/*
 *
 */
AnimalService.prototype.saveAnimal = async function(animals) 
{
}

/*
 *
 */
AnimalService.prototype.updateAnimal = async function(animal) 
{
}

/*
 *
 */
AnimalService.prototype.deleteAnimal = async function(name)
{
}