---
layout: default
title: My first Jekyll post!
---
##My first post written in Markdown

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 

* Hello
* World

**Bold**
_Italic_

{% highlight ruby %}
# ruby test snippet

include Enumerable

def initialize(rbconfig)
  @rbconfig = rbconfig
  @no_harm = false
end

def load_savefile
  begin 
    File.foreach(savefile()) do |line|
    k,v = *.line.split(/=/,2)
    self[k] = v.strip
    end
  rescue
    setup_rb_error $!.message + "\n#{File.basename($0)} config first"
  end
end

def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.