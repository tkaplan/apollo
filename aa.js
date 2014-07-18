var _ = require('lodash');

  var extractProjectBlockData = function(project) {
    var blockDataArray = [];
    _(project.pages).forEach(function(page) {
      _(page.blocks).forEach(function(block) {
        var newBlock = {
          'name': block.name,
          'page': page.name,
          'content': block.content,
          'blockRef': block
        };
        blockDataArray.push(newBlock);
        block.content = null;
      });
    });

    return blockDataArray;
  };


var project = {
	'name': 'project1',
	'pages': [
		{
			name: 'page1',
			blocks: [
				{
					'name':'harry',
					'content': 'content1'
				},
				{
					'name':'harry2',
					'content':'content2'
				},
				{
					'name':'harry3',
					'content':'content3'
				}
			]
		},
		{
			name: 'page2',
			blocks: [
				{
					'name':'harry',
					'content': 'content1'
				},
				{
					'name':'harry2',
					'content':'content2'
				},
				{
					'name':'harry3',
					'content':'content3'
				}
			]
		}
	]
};

console.log(a = extractProjectBlockData(project));
console.log(project.pages[0].blocks);
project._id = 'wlekjfeiwjfielk098098';
          // derive url
          // /project-id + page-name + block-name
          _(a).forEach(function(block) {
            block.url = project._id + block.page + block.name;
            block.blockRef.content = block.url;
          });

console.log(project.pages[0].blocks);
