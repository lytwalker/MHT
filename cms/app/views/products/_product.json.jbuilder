json.extract! product, :id, :thumb, :preview, :name, :description, :price, :sku, :category_id, :created_at, :updated_at
json.url product_url(product, format: :json)