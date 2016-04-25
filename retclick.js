var clicks = 0;

ret.addEventListener("click", function () {
    clicks++;
    if (clicks === 10) {
        ret.textContent = "hi";
        setTimeout(function () {
            ret.textContent = "RET";
            clicks = 0;
        }, 1000);
    }
});
