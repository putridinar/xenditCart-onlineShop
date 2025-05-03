require 'dotenv'
Dotenv.load

Jekyll::Hooks.register :site, :after_init do |site|
  site.config['env_mode'] = ENV['JEKYLL_ENV']
  site.config['staging'] = ENV['CUSTOM_VARIABLE']
  site.config['api_key'] = ENV['api_key']
  site.config['auth_domain'] = ENV['auth_domain']
  site.config['project_id'] = ENV['project_id']
  site.config['storage_bucket'] = ENV['storage_bucket']
  site.config['sender_id'] = ENV['sender_id']
  site.config['app_id'] = ENV['app_id']
  site.config['measure_id'] = ENV['measure_id']
  site.config['bot_token'] = ENV['bot_token']
  site.config['chat_id'] = ENV['chat_id']
  site.config['XENDIT_LIVE_URL'] = ENV['live_url']
  site.config['XENDIT_TEST_URL'] = ENV['test_url']
end