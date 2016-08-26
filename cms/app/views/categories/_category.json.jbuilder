json.extract! category, :id, :thumb, :name, :description, :url, :type_id, :created_at, :updated_at
json.url category_url(category, format: :json)