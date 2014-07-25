(function($){$.fn.fitVids=function(options){var settings={customSelector:null}
var div=document.createElement('div'),ref=document.getElementsByTagName('base')[0]||document.getElementsByTagName('script')[0];div.className='fit-vids-style';div.innerHTML='&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';ref.parentNode.insertBefore(div,ref);if(options){$.extend(settings,options);}
return this.each(function(){var selectors=["iframe[src^='http://player.vimeo.com']","iframe[src^='//player.vimeo.com']","iframe[src^='http://www.youtube.com']","iframe[src^='https://www.youtube.com']","iframe[src^='//www.youtube.com']","iframe[src^='//youtube.com']","iframe[src^='http://www.kickstarter.com']","iframe[src^='http://www.funnyordie.com']","iframe[src^='http://media.mtvnservices.com']","iframe[src^='http://trailers.apple.com']","iframe[src^='http://www.brightcove.com']","iframe[src^='http://blip.tv']","iframe[src^='http://break.com']","iframe[src^='http://www.traileraddict.com']","iframe[src^='http://d.yimg.com']","iframe[src^='http://movies.yahoo.com']","iframe[src^='http://www.dailymotion.com']","iframe[src^='http://s.mcstatic.com']","iframe[src^='http://fastcompany.com']","iframe[src^='http://www.fastcompany.com']","embed"];if(settings.customSelector){selectors.push(settings.customSelector);}
var $allVideos=$(this).find(selectors.join(','));$allVideos.each(function(){var $this=$(this);if(this.tagName.toLowerCase()=='embed'&&$this.parent('object').length||$this.parent('.fluid-width-video-wrapper').length){return;}
var height=this.tagName.toLowerCase()=='object'?$this.attr('height'):$this.height(),aspectRatio=height/$this.width();if(!$this.attr('id')){var videoID='fitvid'+ Math.floor(Math.random()*999999);$this.attr('id',videoID);}
$this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top',(aspectRatio*100)+"%");$this.removeAttr('height').removeAttr('width');});});}})(jQuery);