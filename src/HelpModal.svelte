<script>
    import { createEventDispatcher } from 'svelte';
	
    const dispatch = createEventDispatcher();
	
    export let isOpenModal;
    export let animtationState = "opening";
	
    function closeModal() {
        isOpenModal = false;
        dispatch('closeModal', { isOpenModal });
        //animtationState = "closing";
        // setTimeout(() => {  
        //     isOpenModal = false;
        //     dispatch('closeModal', { isOpenModal });
        // }, 200);
    }
</script>

<div id="background" style="display: {isOpenModal ? 'flex' : 'none'};">
    <div id="modal" style="display: {isOpenModal ? 'block' : 'none'};" animation-state="{animtationState}">
        <div id="closeButton" on:click={closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path fill="#878a8c" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              </svg>
        </div>
        <div id="title">
            How to play
        </div>
        <div id="instructions" display="block">
            <p>Guess the <b>WORDLE</b> in 6 tries.</p>
            <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
            <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
            <div id="examples" display="block">
                <p><b>Examples</b></p>
                <div class="examplePills">
                    <div class="gameTile" data-state="correct">W</div>
                    <div class="gameTile" data-state="">E</div>
                    <div class="gameTile" data-state="">A</div>
                    <div class="gameTile" data-state="">R</div>
                    <div class="gameTile" data-state="">Y</div>
                </div>
                <p>The letter <b>W</b> is in the word and in the correct spot.</p>
                <div class="examplePills">
                    <div class="gameTile" data-state="">P</div>
                    <div class="gameTile" data-state="present">I</div>
                    <div class="gameTile" data-state="">L</div>
                    <div class="gameTile" data-state="">L</div>
                    <div class="gameTile" data-state="">S</div>
                </div>
                <p>The letter <b>I</b> is in the word but in the wrong spot.</p>
                <div class="examplePills">
                    <div class="gameTile" data-state="">V</div>
                    <div class="gameTile" data-state="">A</div>
                    <div class="gameTile" data-state="">G</div>
                    <div class="gameTile" data-state="absent">U</div>
                    <div class="gameTile" data-state="">E</div>
                </div>
                <p>The letter <b>U</b> is not in the word in any spot.</p>
            </div>
            <div style="padding-top:14px;"><b>A new WORDLE will be available each day!</b></div>
        </div>
    </div>
</div>

<style>
    #background {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        justify-content: center;
        background-color: white;
        z-index: 2000;
    }
    #modal {
        display: none;
        position: relative;
        background: #fff;
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
    #title {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
    }
    #instructions {
        font-size: 14px;
        color: #1a1a1b;
    }
    #examples {
        font-size: 14px;
        color: #1a1a1b;
        border-bottom: 1px solid #d3d6da;
        border-top: 1px solid #d3d6da;
    }
    .examplePills {
		display: inline-flex;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 5px;
        margin-top: 12px;
    }
    .gameTile {
		width: 40px;
        height: 40px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 2rem;
		line-height: 2rem;
		font-weight: bold;
		vertical-align: middle;
		box-sizing: border-box;
		text-transform: uppercase;
		user-select: none;
		background-color: #ffffff;
		border: 2px solid #d3d6da;
		color: #1a1a1b;
	}
	.gameTile[data-state='absent'] {
		background-color:#787c7e;
		border: 2px solid #787c7e;
		color: white;
	}
	.gameTile[data-state='correct'] {
		background-color:#6aaa64;
		border: 2px solid #6aaa64;
		color: white;
	}
	.gameTile[data-state='present'] {
		background-color:#c9b458;
		border: 2px solid #c9b458;
		color: white;
	}
</style>
