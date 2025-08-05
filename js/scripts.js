/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


        // YouTube IFrame API 스크립트 로드
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 생성된 플레이어들을 저장할 객체
        var players = {};

        // API가 준비되면 호출될 함수
        function onYouTubeIframeAPIReady() {
            // 모든 player-container 요소를 찾아서 각각 플레이어 생성
            var playerContainers = document.querySelectorAll('.player-container');
            playerContainers.forEach(function(container, index) {
                var playerDiv = container.querySelector('.player');
                var videoId = container.getAttribute('data-video-id');
                var playerId = 'player-' + index; // 각 플레이어에 고유 ID 부여
                playerDiv.setAttribute('id', playerId);

                players[playerId] = new YT.Player(playerId, {
                    height: '100%',
                    width: '100%',
                    videoId: videoId,
                    playerVars: { 'rel': 0 },
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });
            });
        }

        // 플레이어 상태 변경 시 호출될 함수
        function onPlayerStateChange(event) {
            var playerElement = event.target.getIframe();
            var container = playerElement.closest('.player-container');
            var endScreen = container.querySelector('.end-screen');

            // 영상 재생이 끝나면 종료 화면 표시
            if (event.data == YT.PlayerState.ENDED) {
                endScreen.style.display = 'flex';
            } else {
                // 다른 상태일 때는 종료 화면 숨김
                endScreen.style.display = 'none';
            }
        }

        // '다시 보기' 버튼 클릭 이벤트 처리 (이벤트 위임 사용)
        const allVideosWrappers = document.querySelectorAll('.videos-wrapper');

        allVideosWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', function(event) {
                const replayButton = event.target.closest('.replay-button');
        
                if (replayButton) {
                    const container = replayButton.closest('.player-container');
                    const playerId = container.querySelector('.player').id;
                    const player = players[playerId];

                    // 플레이어 객체가 존재하는지 한번 더 확인
                    if (player) {
                        container.querySelector('.end-screen').style.display = 'none';
                        player.seekTo(0);
                        player.playVideo();
                    }
                }
            });
        });

// 페이지에 있는 모든 포트폴리오 모달창을 선택합니다.
const portfolioModals = document.querySelectorAll('.portfolio-modal');

// 각각의 모달창에 이벤트 리스너를 추가합니다.
portfolioModals.forEach(modal => {
    // 모달이 닫히기 시작할 때 'hide.bs.modal' 이벤트가 발생합니다.
    modal.addEventListener('hide.bs.modal', function () {
        // 현재 닫히고 있는 이 모달창('modal') 내부의 모든 동영상 플레이어를 찾습니다.
        const playersInModal = modal.querySelectorAll('.player');

        if (playersInModal.length > 0) {
            playersInModal.forEach(playerDiv => {
                const playerId = playerDiv.id;
                // 'players' 객체에 해당 ID를 가진 플레이어가 실제로 존재하고, 제어 가능한 상태인지 확인합니다.
                if (players[playerId] && typeof players[playerId].stopVideo === 'function') {
                    // 동영상을 정지하고 재생 대기 상태(0초)로 되돌립니다.
                    players[playerId].stopVideo();
                }
            });
        }
    });
});

