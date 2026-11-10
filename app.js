const container = document.querySelector('.container');
const left = container.querySelector('.split.left');
const right = container.querySelector('.split.right');

left.addEventListener('mouseenter', () => {
    container.classList.add('hover_left');
});

left.addEventListener('mouseleave', () => {
    container.classList.remove('hover_left');
});

right.addEventListener('mouseenter', () => {
    container.classList.add('hover_right');
});

right.addEventListener('mouseleave', () => {
    container.classList.remove('hover_right');
});

const leftSplit = document.querySelector(".split.left");
const rightSplit = document.querySelector(".split.right");

const toggleOpacity = (element, opacity) => {
    element.style.opacity = opacity;
};

leftSplit.addEventListener('mouseover', () => {
    toggleOpacity(document.querySelector(".split.right h1"), '0.1');
    toggleOpacity(document.querySelector(".split.right a"), '0.1');
});

leftSplit.addEventListener('mouseout', () => {
    toggleOpacity(document.querySelector(".split.right h1"), '1');
    toggleOpacity(document.querySelector(".split.right a"), '1');
});

rightSplit.addEventListener('mouseover', () => {
    toggleOpacity(document.querySelector(".split.left h1"), '0.1');
    toggleOpacity(document.querySelector(".split.left a"), '0.1');
});

rightSplit.addEventListener('mouseout', () => {
    toggleOpacity(document.querySelector(".split.left h1"), '1');
    toggleOpacity(document.querySelector(".split.left a"), '1');
});