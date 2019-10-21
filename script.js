$(document).ready(function() {

	$.getJSON('https://raw.githubusercontent.com/wrike/frontend-test/master/data.json', function(data) {

		const createTree = (data, id, parent, rootParent) => {
			const tree = { [rootParent]: { children: [] } };

			data.forEach(n => tree[n[id]] = { children: [], ...n } );
			data.forEach(n => tree[n[parent]].children.push(tree[n[id]]));

			return tree[rootParent].children;
		};

		const tree = createTree(data, 'id', 'parentId', null);

		const deep = (obj) => {
		const children = obj.children ? `<ul>${obj.children.map(deep).join('')}</ul>` : '';
		return `<li>${obj.title}${children}</li>`;
		};

		$('.tree').append(deep(tree[0]));


		var ul = document.getElementsByClassName('tree')[0];

		document.querySelector('ul').addEventListener('click', (e) => {
			if (e.target.tagName === 'LI') {
				const [ul] = e.target.children;
				if (ul) {
					[ul, ...ul.querySelectorAll('ul')].forEach((elem) => elem.hidden = !elem.hidden);
				}
			}
		});

		$(document).ready(function(){
			$('#search').on('input', function(){
				var string = $(this).val().toLowerCase();
				if (string.length <= 0) {
					$('.tree li').show();
				}
				else {
					$('ul.tree li').each(function(){
						if ($(this).text().toLowerCase().indexOf(string) < 0) {
							$(this).hide();
						}
					});
				}
			})
		});
	});
});