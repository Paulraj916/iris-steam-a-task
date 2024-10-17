const quote = document.querySelector('.quote');
        const container = document.querySelector('.road-container');
        const minFontSize = 0.5;
        const maxFontSize = 3;

        function updateQuoteSize() {
            const rect = container.getBoundingClientRect();
            const containerTop = rect.top;
            const containerBottom = rect.bottom;
            const windowHeight = window.innerHeight;

            if (containerTop < windowHeight && containerBottom > 0) {
                const scrollPercentage = (windowHeight - containerTop) / (windowHeight + rect.height);
                const newSize = minFontSize + (maxFontSize - minFontSize) * scrollPercentage;
                quote.style.fontSize = `${Math.min(Math.max(newSize, minFontSize), maxFontSize)}rem`;
            }
        }

        window.addEventListener('scroll', updateQuoteSize);
        window.addEventListener('resize', updateQuoteSize);
        updateQuoteSize(); // Initial call to set the correct size



        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY; // Get current scroll position
            const element = document.querySelector('.element-content');

            // Apply a parallax effect to the entire .element by shifting it based on scroll
            element.style.transform = `translateY(${scrollY * 0.3}px)`; // Moves the .element half the distance of scroll
        });




        const menuToggle = document.querySelector('.menu-toggle');
        const navItems = document.querySelector('.navbar-mobile');
        const dropdownToggle = document.querySelector('.dropdown-toggle');



        menuToggle.addEventListener('click', () => {
            navItems.classList.toggle('active');
        });

        dropdownToggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 800) {
                e.preventDefault();
                dropdownToggle.parentElement.classList.toggle('active');
            }
        });
    
        const roadContainer = document.querySelector('.road-container');
        const backgroundContainer = document.getElementById('backgroundContainer');
        let lastScrollTop = 0;
        let isVehicleVisible = true;

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercentage = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
            const moveDistance = 100 * scrollPercentage;

            // Vertical movement of the road container
            roadContainer.style.bottom = `${moveDistance}vh`;

            // Check if vehicles are visible
            isVehicleVisible = moveDistance < 100;

            // Horizontal scrolling effect
            if (isVehicleVisible) {
                const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
                const currentPosition = parseFloat(backgroundContainer.style.left) || 0;
                
                if (scrollDirection === 'down') {
                    backgroundContainer.style.left = `${currentPosition - 5}px`;
                } else {
                    backgroundContainer.style.left = `${currentPosition + 5}px`;
                }

                // Reset position if it goes too far
                if (Math.abs(currentPosition) >= backgroundContainer.offsetWidth / 2) {
                    backgroundContainer.style.left = '0px';
                }
            }

            lastScrollTop = scrollTop;
        });