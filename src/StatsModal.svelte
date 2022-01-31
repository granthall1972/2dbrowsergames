<script>
    import { createEventDispatcher } from 'svelte';
	
    const dispatch = createEventDispatcher();
	
    export let isOpenModal;
    export let animtationState = "opening";

    export let gamesPlayed = 0;
    export let winPercentage = 0;
    export let currentStreak = 0;
    export let maxStreak = 0;
	
    function closeModal() {
        isOpenModal = false;
        dispatch('closeModal', { isOpenModal });
    }
</script>

<div id="background" style="display: {isOpenModal ? 'flex' : 'none'};">
    <div id="modal" style="display: {isOpenModal ? 'block' : 'none'};" animation-state="{animtationState}">
        <div id="closeButton" on:click={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path fill="#878a8c" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
        </div>
        <div id="content">
            <div><h1>STATISTICS</h1></div>
            <div class="statistics">
                <div class="statistic-container">
                    <div class="statistic">{gamesPlayed}</div>
                    <div class="label">Played</div>
                </div>
                <div class="statistic-container">
                    <div class="statistic">{winPercentage}</div>
                    <div class="label">Win %</div>
                </div>
                <div class="statistic-container">
                    <div class="statistic">{currentStreak}</div>
                    <div class="label">Current Streak</div>
                </div>
                <div class="statistic-container">
                    <div class="statistic">{maxStreak}</div>
                    <div class="label">Max Streak</div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    h1 {
        font-weight: 700;
        font-size: 16px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 10px;
    }
    #background {
        position: absolute;
        display:flex;
        z-index: 1;
        width: 100%;
        height:100%;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
        background-color:rgba(255, 255, 255, 0.5);
    }

    #modal {
        display: none;
        position: relative;
        z-index: 2;
        background: #fff;
        border: 1px solid #f6f7f8;
        box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
        border-radius: 8px;
        width: 90%;
        max-height: 90%;
        padding: 16px;
        max-width: 500px;
        overflow-y: auto;
        box-sizing: border-box;
        color: #1a1a1b;
    }
    #modal[animation-state = "opening"] {
        animation: SlideIn 200ms;
    }
    #modal[animation-state = "closing"] {
        animation: SlideOut 200ms;
    }
    @keyframes SlideIn {
        0% {
            transform: translateY(30px);
            opacity: 0;
        }
        100% {
            transform: translateY(0px);
            opacity: 1;
        }
    }
    @keyframes SlideOut {
        0% {
            transform: translateY(0px);
            opacity: 1;
        }
        90% {
            opacity: 0;
        }
        100% {
            opacity: 0;
            transform: translateY(60px);
        }
    }

    #closeButton {
        position: fixed;
        user-select: none;
        cursor: pointer;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 16px;
        right: 16px;
    }

    #content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 16px 0;
    }

    .statistics {
        padding-bottom: 10px;
        display: flex;
    }

    .statistic-container {
        flex:1;
    }

    .statistic-container .statistic {
        font-size: 36px;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        letter-spacing: 0.05em;
        font-variant-numeric: proportional-nums;
    }

    .statistic-container .label {
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
</style>
