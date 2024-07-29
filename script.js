document.addEventListener('DOMContentLoaded', function() {
    const cropSelection = document.querySelectorAll('input[name="crop"]');
    const plantingForm = document.getElementById('plantingForm');
    const poisonCountdown = document.getElementById('poisonCountdown');
    const fertilizerCountdown = document.getElementById('fertilizerCountdown');
    const harvestCountdown = document.getElementById('harvestCountdown');

    let selectedCrop;

    // Event listener para selecionar a cultura
    cropSelection.forEach(function(radio) {
        radio.addEventListener('change', function() {
            selectedCrop = this.value;
        });
    });

    // Event listener para submeter o formulário
    plantingForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const plantDate = new Date(document.getElementById('plantDate').value);
        if (!selectedCrop) {
            alert('Por favor, selecione a cultura antes de continuar.');
            return;
        }
        startTimers(plantDate);
    });

    function startTimers(plantDate) {
        // Definir os tempos estimados para cada cultura
        let poisonDays, fertilizerDays, harvestDays;

        switch (selectedCrop) {
            case 'milho':
                poisonDays = 30;
                fertilizerDays = 15;
                harvestDays = 90;
                break;
            case 'soja':
                poisonDays = 25;
                fertilizerDays = 20;
                harvestDays = 100;
                break;
            case 'trigo':
                poisonDays = 35;
                fertilizerDays = 10;
                harvestDays = 120;
                break;
            default:
                break;
        }

        // Calcular as datas alvo
        const poisonDate = new Date(plantDate);
        poisonDate.setDate(poisonDate.getDate() + poisonDays);

        const fertilizerDate = new Date(plantDate);
        fertilizerDate.setDate(fertilizerDate.getDate() + fertilizerDays);

        const harvestDate = new Date(plantDate);
        harvestDate.setDate(harvestDate.getDate() + harvestDays);

        // Iniciar os cronômetros
        startCountdown(poisonDate, poisonCountdown);
        startCountdown(fertilizerDate, fertilizerCountdown);
        startCountdown(harvestDate, harvestCountdown);
    }

    function startCountdown(targetDate, displayElement) {
        const timerInterval = setInterval(function() {
            const now = new Date().getTime();
            const timeDiff = targetDate - now;

            if (timeDiff < 0) {
                clearInterval(timerInterval);
                displayElement.textContent = 'Tempo expirado!';
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            displayElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    }
});
