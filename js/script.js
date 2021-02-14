window.addEventListener('load', function(){

	// ПЕРЕКЛЮЧЕНИЕ МЕЖДУ ПОСТАМИ
	(function () {
		var left = document.getElementsByClassName('text_slide_left')[0];
		var right = document.getElementsByClassName('text_slide_right')[0];

		var count_mass = document.getElementsByClassName('text_slider_count'); 		// массив из тегов p содержащих номер поста
		var post_mass = document.getElementsByClassName('text_post_wrapper'); 		// массив самих постов
		var img_mass = document.getElementsByClassName('image_wrapper');			// массив из картинок для постов
		var square_post = document.getElementsByClassName('post_number');			// массив из квадратов указателей		
		var this_post = get_this_post();
		function get_this_post() {
			for(var x = 0; x < count_mass.length; x++) {
				if( count_mass[x].classList.length == 1 ) {
					return x + 1;
				}
			}
		}

		function go_to_the_next() {
			
			removeClick();
			removeScroll();
			
			for(var i = 0; i < count_mass.length - 1; i++) {

				if( count_mass[i].classList.length == 1 ) {

					var ontransition_end = function() {
						var now_count = this.textContent * 1;				
						count_mass[now_count - 1].removeEventListener('transitionend', ontransition_end);

						count_mass[now_count].classList.remove('count_to_the_right');
						post_mass[now_count].classList.remove('to_the_right');
						img_mass[now_count].classList.remove('to_the_right');
						

						this_post = get_this_post();	
						addClick();

						var scrollTimeout = setTimeout(function() {
							addScroll();
							clearTimeout(scrollTimeout);
						}, 100);
					}
					
					count_mass[i].addEventListener('transitionend', ontransition_end);		// слушаем завершение анимации

					count_mass[i].classList.add('count_to_the_left');
					post_mass[i].classList.add('to_the_left');
					img_mass[i].classList.add('to_the_left');

					square_post[i].classList.remove('active_point');
					square_post[i + 1].classList.add('active_point');
				}
			}
		}

		function go_to_the_previous() {
			
			removeClick();
			removeScroll();

			for(var j = 0; j < count_mass.length; j++) {

				if( count_mass[j].classList.length == 1 ) {

					var ontransition_end = function() {
						var now_count = this.textContent * 1;		
						count_mass[now_count - 1].removeEventListener('transitionend', ontransition_end);

						count_mass[now_count - 2].classList.remove('count_to_the_left');
						post_mass[now_count - 2].classList.remove('to_the_left');
						img_mass[now_count - 2].classList.remove('to_the_left');
						
						this_post = get_this_post();
						addClick();

						var scrollTimeout = setTimeout(function() {
							addScroll();
							clearTimeout(scrollTimeout);
						}, 100);
					}
					
					count_mass[j].addEventListener('transitionend', ontransition_end);

					count_mass[j].classList.add('count_to_the_right');
					post_mass[j].classList.add('to_the_right');
					img_mass[j].classList.add('to_the_right');

					square_post[j].classList.remove('active_point');
					square_post[j - 1].classList.add('active_point');
				}
			}
		}


		// Назначение и удаление переключаелей

		// Кнопки вперёд/назад
		function removeClick() {
			right.removeEventListener('click', go_to_the_next);
			left.removeEventListener('click', go_to_the_previous);
		}
		function addClick() {
			
			switch(this_post) {
				case 1:
					right.addEventListener('click', go_to_the_next);
					left.removeEventListener('click', go_to_the_previous);
				  	break;
				case 4:
					right.removeEventListener('click', go_to_the_next);
					left.addEventListener('click', go_to_the_previous);
					break;
				default:
					right.addEventListener('click', go_to_the_next);
					left.addEventListener('click', go_to_the_previous);
			}
		}

		// Скрол
		function wheeling() {
			if( Math.sign(event.deltaY) == 1 && this_post < 4) {
				go_to_the_next();
			} else if ( Math.sign(event.deltaY) == -1 && this_post > 1) {
				go_to_the_previous();
			}
		}
		function addScroll() {
			window.addEventListener('wheel', wheeling);
		}
		function removeScroll() {
			window.removeEventListener('wheel', wheeling);
		}

		// Навигация по постам
		function letNavigate(event) {
			var active_point = document.getElementsByClassName('active_point')[0].getAttribute('name');
			var this_point = this.getAttribute('name');
			
			active_point *= 1;
			this_point *= 1;

			if( this_point > active_point ) {
				go_to_the_next(this_point);
			} else if( this_point < active_point ) {
				go_to_the_previous(this_point);
			} else {
				return;
			}
		}

		function addNavigation() {
			for(var y = 0; y < square_post.length; y++) {
				square_post[y].addEventListener('click', letNavigate);
			}
		}

		function removeNavigation() {
			for(var y = 0; y < square_post.length; y++) {
				square_post[y].removeEventListener('click', letNavigate);
			}
		}

		//////////////////////////////////////
		addNavigation();
		addClick();
		addScroll();
	})();



	// ВЫПАДАЮЩЕЕ МЕНЮ
	(function() {
		var menu_button = document.getElementsByClassName('menu_button')[0];
		var menu = document.getElementsByClassName('menu_block_wrapper')[0];
		var open = 0;

		function addClick() {	
			switch(open) {
				case 0:
					menu_button.removeEventListener('click', menu_off);
					menu_button.addEventListener('click', menu_on);
				break;

				case 1:
					menu_button.removeEventListener('click', menu_on);
					menu_button.addEventListener('click', menu_off);
				break;
			}
		}

		function removeClick() {
			menu_button.removeEventListener('click', menu_on);
			menu_button.removeEventListener('click', menu_off);
		}

		function menu_on() {
			removeClick();
			var on_transition_end = function() {
				menu.removeEventListener('transitionend', on_transition_end);
				open = 1;
				addClick();
			}
			menu.addEventListener('transitionend', on_transition_end);
			menu.classList.add('menu_block_on');
		}

		function menu_off() {
			removeClick();
			var on_transition_end = function() {
				menu.removeEventListener('transitionend', on_transition_end);
				open = 0;
				addClick();
			}
			menu.addEventListener('transitionend', on_transition_end);
			menu.classList.remove('menu_block_on');
		}

		addClick();

	})();



	// ФОРМА ОБРАТНОЙ СВЯЗИ
	(function() {

		var form_width = document.getElementsByClassName('form_wrapper')[0];
		var form_button = document.getElementsByClassName('triangle_wrapper')[0];
		var open_button = document.getElementsByClassName('form_open_button')[0];
		var close_button = document.getElementsByClassName('form_close_button')[0];
		var send_button = document.getElementsByClassName('send_button')[0];
		var menu_is_on = 0;

		// inputs
		var name_input = document.getElementById('user_name');
		var email_input = document.getElementById('user_mail');

		function menu_off() {
			var on_transition_end = function() {
				form_width.removeEventListener('transitionend', on_transition_end);
				menu_is_on = 0;
				open_button.style.zIndex = 300;
				open_button.style.cursor = 'pointer';
				open_button.addEventListener('click', menu_on);	
				send_button.style.display = "none";
			}

			close_button.removeEventListener('click', menu_off);
			name_input.style.display = 'none';
			email_input.style.display = 'none';	

			close_button.classList.remove('close_button_on');
			send_button.classList.remove('send_button_visible');
			form_width.addEventListener('transitionend', on_transition_end);
			form_button.classList.remove('triangle_rotate');
			form_width.classList.remove('form_moove');
		}

		function menu_on() {
			var on_transition_end = function() {
				form_width.removeEventListener('transitionend', on_transition_end);
				menu_is_on = 1;
				close_button.classList.add('close_button_on');
				send_button.classList.add('send_button_visible');
				close_button.addEventListener('click', menu_off);

				name_input.style.display = 'block';
				email_input.style.display = 'block';	
			}
			send_button.style.display = "block";
			open_button.removeEventListener('click', menu_on);
			open_button.style.zIndex = 0;
			open_button.style.cursor = 'default';
			form_width.addEventListener('transitionend', on_transition_end);
			form_button.classList.add('triangle_rotate');
			form_width.classList.add('form_moove');
		}

		open_button.addEventListener('click', menu_on);

	})();
});