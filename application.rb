require File.expand_path('../boot', __FILE__)

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module RealTimaChat
  class Application < Rails::Application

    config.middleware.delete Rack::Lock
    if Rails.env.development?
      config.middleware.use FayeRails::Middleware, mount: '/faye', :timeout => 25
    elsif Rails.env.production? 
      config.middleware.use FayeRails::Middleware, mount: '/faye', :timeout => 25, server: 'passenger', engine: {type: Faye::Redis, host: 	'localhost'}
    end
  end
end
