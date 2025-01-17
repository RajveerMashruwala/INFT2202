console.log('we are on the list page');

/* do table stuff */
const eleEmpty = document.getElementById('empty-message');
const eleTable = document.getElementById('animal-list');

const records = animalService.getAnimals();

if (!records.length) {
    eleEmpty.classList.remove('d-none');
    eleTable.classList.add('d-none');
} else {
    eleEmpty.classList.add('d-none');
    eleTable.classList.remove('d-none');
    drawAnimalTable(records);
}
/* 
 * 
 */
function drawAnimalTable(animals) 
{

}