module PageHelper
  # Helper Calculate for Excel Page
  def convert_f(string)
    if check_strip(string)
      string.gsub(".","").gsub(",",".").gsub("-","").to_f*-1 
    else
      string.gsub(".","").gsub(",",".").to_f 
    end
  end

  def remove_strip(string)
    string.gsub(".","").gsub(",",".").gsub("-","").to_f
  end

  def convert_percent(float)
    (float*100).round(2).to_s + "%"
  end

  def get_percent(a,b)
    if convert_f(b)==0 && check_strip(a)
      return "-100%"
    elsif convert_f(b)==0
      return "100%"
    elsif (((convert_f(a) - convert_f(b))/remove_strip(b))*100).round(1) > 100
      return ">100%"
    elsif (((convert_f(a) - convert_f(b))/remove_strip(b))*100).round(1) < -100
      return "<- 100%"
    else
      (((convert_f(a) - convert_f(b))/remove_strip(b))*100).round(1).to_s + "%"
    end
  end

  def check_strip(string)
    if(string.strip.include? "-")
      return true
    elsif(string.strip.include? "(")
      return true
    else
      return false
    end
  end

  def compare_string(a,b)
    convert_f(b) != convert_f(a)
  end

  def check_percent_diff(a,b)
    if(compare_string(a,b))
      return get_percent(a,b)
    else
      return " "
    end
  end

  def check_for_class(a,b,c)
    if(check_strip(a))
      return b
    else
      return c
    end
  end
end
