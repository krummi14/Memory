import './styles/style.scss';
//document.getElementById('h1_memory')!.innerText = "first thread";

init();

function init() {
    const fieldRef = document.getElementById('field');
    if (fieldRef) {
        fieldRef.addEventListener('click', e => {
            const card = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
            if (card) {
                card.classList.toggle('is_flipped');
            }
        })
    }
}