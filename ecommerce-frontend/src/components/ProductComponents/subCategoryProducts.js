import placeholderimg from "../../images/placeholder-image.jpg";
const subcategoryProducts = [

  {
    subcategoryId : 1,
    subCategoryName: "Decoration",
    category:"Home Utilities",
    categoryId:"4", // category ID nuk tvyn ktu hiq se e merr si Route parameter
    products : [{
        id: 101,
        name: "Product A1",
        description: "Description for Product A1",
        img: "/images/shoe.jpeg",
        cost: 300,
        // category: "home utilities",
        company:"Company A",
        companyId:1,
        // categoryId:4,
        stock: 0,
        Rating:2
        },
        {
            id: 104,
            name: "Product A4",
            description: "Description for Product A4",
            img: "/images/laptop.webp",
            cost: 350,
            // category: "home utilities",
            // categoryId:4,
            company:"Company A",
            companyId:1,
            stock: 25,
            Rating:2

        },
        {    id: 107,
            name: "Product A7",
            description: "Description for Product A7",
            img: "/images/laptopBag.jpg",
            cost: 280,
            // category: "home utilities",
            // categoryId:4,
            company:"Company A",
            companyId:1,
            stock: 12,
            Rating:2

        }
    ]
    },{
        subcategoryId : 2,
        subCategoryName: "Women's Clothing",
        category: "Clothes",
        categoryId:2,
        products:[
            {
                id: 102,
                name: "Product A2",
                description: "Description for Product A2",
                img: "/images/iphone.jpg",
                cost: 250,
                // category: "clothes",
                // categoryId:2,
                company:"Company B",
                companyId:2,
                stock: 15,
                Rating:2
            }
            ,{
                id: 105,
                name: "Product A5",
                description: "Description for Product A5",
                img: "/images/mac.jpg",
                cost: 200,
                // category: "clothes",
                // categoryId:2,
                company:"Company C",
                companyId:3,
                stock: 18,
                Rating:2
              }
        ]
    },
    {
        subcategoryId:3,
        subCategoryName: "Phones",
        category:"Electronics",
        categoryId:1,
        products : [
            {
                id: 103,
                name: "Product A3",
                description: "Description for Product A3",
                img: "/images/shoe.jpeg",
                cost: 400,
                // category: "electronics",
                company:"Company D",
                companyId:4,
                // categoryId:1,
                stock: 10,
                Rating:2
            },
            {    id: 201,
                name: "Product B1",
                description: "Description for Product B1",
                img: placeholderimg,
                cost: 45.56,
                // category: "electronics",
                // categoryId:1,
                company:"Company D",
                companyId:4,
                stock: 50,
                Rating:2},
            {
                id: 210,
                name: "Product B10",
                description: "Description for Product B10",
                img: placeholderimg,
                cost: 150,
                // category: "electronics",
                // categoryId:1,
                company:"Company A",
                companyId:1,
                stock: 65,
                Rating:2
            }

        ]
    },{
      
        subcategoryId:4,
        subCategoryName: "Laptops",
        category: "Electronics",
        categoryId:1,
        products : [
            {
                id: 106,
                name: "Product A6",
                description: "Description for Product A6",
                img: "/images/airpods.webp",
                cost: 150,
                // category: "electronics",
                // categoryId:1,
                company:"Company B",
                companyId:2,
                stock: 22,
                Rating:2
              },
              {
                id: 204,
                name: "Product B4",
                description: "Description for Product B4",
                img: placeholderimg,
                cost: 80,
                // category: "electronics",
                // categoryId:1,
                company:"Company A",
                companyId:1,
                stock: 60,
                Rating:2
              },{
                id: 207,
                name: "Product B7",
                description: "Description for Product B7",
                img: placeholderimg,
                cost: 70,
                // category: "electronics",
                // categoryId:1,
                company:"Company B",
                companyId:2,
                stock: 70,
                Rating:3
              },
              {
                id: 403,
                name: "Product D3",
                description:
                  "longeeeeeeeeeeeeeeeeeeeeeeeeeeeeer Description for Product D3 bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                img: placeholderimg,
                cost: 125,
                // category: "electronics",
                company:"Company C",
                companyId:3,
                // categoryId:1,
                stock: 30,
                Rating:2
              },
              {
                id: 409,
                name: "Product D9",
                description: "Description for Product D9",
                img: placeholderimg,
                cost: 115,
                // category: "electronics",
                // categoryId:1,
                company:"Company A",
                companyId:1,
                stock: 38,
                Rating:2
              },
        ]
    },
    {
        subcategoryId:5,
        subCategoryName: "Tablets",
        category: "Electronics",
        categoryId:1,
        products : [
            {
                id: 109,
                name: "Product A9",
                description: "Description for Product A9",
                img: placeholderimg,
                cost: 220,
                // category: "electronics",
                company:"Company D",
                companyId:4,
                // categoryId:1,
                stock: 20,
                Rating:2
              }
        ]
    },
    {
        subcategoryId:6,
        subCategoryName:"Furnitures",
        category: "Home Utilities",
        categoryId:4,
        products:[{
            id: 110,
            name: "Product A10",
            description: "Description for Product A10",
            img: "/images/laptopBag.jpg",
            cost: 320,
            // category: "home utilities",
            // categoryId:4,
            company:"Company A",
            companyId:1,
            stock: 28,
            Rating:2
        }
        ]
    }
    ,{
        subcategoryId:7,
        subCategoryName: "Fantasy",
        category:"Books",
        categoryId:5,
        products:[{
            id: 202,
            name: "Product B2",
            description: "Description for Product B2",
            img: placeholderimg,
            cost: 155,
            // category: "books",
            // categoryId:5,
            company:"Company B",
            companyId:2,
            stock: 40,
            Rating:2
        },{
                id: 208,
                name: "Product B8",
                description: "Description for Product B8",
                img: placeholderimg,
                cost: 95,
                // category: "books",
                subcategory:"fantasy",
                company:"Company C",
                companyId:3,
                stock: 48,
                Rating:2  
        }
        ,{
        },
        {
          id: 302,
          name: "Product C2",
          description: "Description for Product C2",
          img: placeholderimg,
          cost: 55,
        //   category: "books",
        //   categoryId:5,
          company:"Company D",
          companyId:4,
          stock: 20,
          Rating:0
        }
        ,{
            id: 305,
            name: "Product C5",
            description: "Description for Product C5",
            img: placeholderimg,
            cost: 90,
            // category: "books",
            // categoryId:5,
            company:"Company D",
            companyId:4,
            stock: 22,
            Rating:4
        }
        
        ]
    },
    {
        subcategoryId:8,
        subCategoryName:"Suitcases",
        category: "Travel And Luggage",
        categoryId:20,
        products:[{
            
                id: 203,
                name: "Product B3",
                description: "Description for Product B3",
                img: placeholderimg,
                cost: 130.22,
                // category: "travel and luggage",
                company:"Company B",
                companyId:2,
                stock: 35,
                Rating:2
            }, {
                id: 209,
                name: "Product B9",
                description: "Description for Product B9",
                img: placeholderimg,
                cost: 110,
                // category: "travel and luggage",
                company:"Company A",
                companyId:1,
                stock: 38,
                Rating:2
            }
        ]
    }
    ,{
        subcategoryId:9,
        subCategoryName: "Romance",
        category: "Books",
        categoryId:5,
        products:[{
            id: 308,
            name: "Product C8",
            description: "Description for Product C8",
            img: placeholderimg,
            cost: 120,
            // category: "books",
            // categoryId:5,
            company:"Company A",
        companyId:1,
            stock: 28,
            Rating:2
        }, 
       ]
    },{
        subcategoryId:10,
        category: "Travel And Luggage",
        categoryId:20,
        products:[{
            id: 206,
            name: "Product B6",
            description: "Description for Product B6",
            img: placeholderimg,
            cost: 100,
            // category: "travel and luggage",
            company:"Company B",
            companyId:2,
            stock: 55,
            Rating:4
        }]
    }
    ,{
       subcategoryId:11,
       subCategoryName: "Bracelets",
       category: "Accessories",
       categoryId:6,
       products:[
        {
            id: 301,
            name: "Product C1",
            description: "Description for Product C1",
            img: placeholderimg,
            cost: 123,
            // category: "accessories",
            // categoryId:6,
            company:"Company C",
            companyId:3,
            stock: 25,
            Rating:2
       },{
        id: 307,
        name: "Product C7",
        description: "Description for Product C7",
        img: placeholderimg,
        cost: 85,
        // category: "accessories",
        // categoryId:6,
        company:"Company C",
        companyId:3,
        stock: 35,
        Rating:3
       },
      ]
    },{
        subcategoryId:12,
        subCategoryName: "Skincare",
        category: "Health And Beauty",
        categoryId:3,
        products:[
            {
                id: 303,
                name: "Product C3",
                description: "Description for Product C3",
                img: placeholderimg,
                cost: 130,
                // category: "health and beauty",
                // categoryId:3,
                company:"Company C",
            companyId:3,
                stock: 15,
                Rating:1
            }
            ,{
                id: 309,
                name: "Product C9",
                description: "Description for Product C9",
                img: placeholderimg,
                cost: 95,
                // category: "health and beauty",
                // categoryId:3,
                company:"Company C",
                companyId:3,
                stock: 32,
                Rating:2
              },
        ]
    },{
        subcategoryId:13,
        subCategoryName: "Necklaces",
        category: "Accessories",
        categoryId:6,
        products:[{
            id: 304,
            name: "Product C4",
            description: "Description for Product C4",
            img: placeholderimg,
            cost: 75,
            // category: "accessories",
            // categoryId:6,
            company:"Company C",
            companyId:3,
            stock: 30,
            Rating:3
        },{
            
                id: 310,
                name: "Product C10",
                description: "Description for Product C10",
                img: placeholderimg,
                cost: 110,
                // category: "accessories",
                company:"Company D",
                companyId:4,
                // categoryId:6,
                stock: 40,
                Rating:2
              
        },{
            id: 402,
            name: "Product D2",
            description: "Description for Product D2",
            img: placeholderimg,
            cost: 120,
            // category: "accessories",
            company:"Company D",
            companyId:4,
            // categoryId:6,
            stock: 35,
            Rating:2
          },
        ]
    },{
        subcategoryId:14,
        subCategoryName: "Eye Makeup",
        category: "Health And Beauty",
        categoryId:3,
        products:[
            {
            id: 306,
            name: "Product C6",
            description: "Description for Product C6",
            img: placeholderimg,
            cost: 105,
            // category: "health and beauty",
            // categoryId:3,
            company:"Company D",
            companyId:4,
            stock: 18,
            Rating:1
          },
        
        ]
    },{
        subcategoryId:15,
        subCategoryName: "Board Games",
        category: "Games",
        categoryId:31,
        products:[
            {
            id: 404,
            name: "Product D4",
            description: "Description for Product D4",
            img: placeholderimg,
            cost: 135,
            // category: "games",
            company:"Company D",
            companyId:4,
            stock: 50,
            Rating:2
          },{
            id: 407,
            name: "Product D7",
            description: "Description for Product D7",
            img: placeholderimg,
            cost: 110,
            // category: "games",
            company:"Company D",
            companyId:4,
            stock: 55,
            Rating:2
          },
          {
            id: 410,
            name: "Product D10",
            description: "Description for Product D10",
            img: placeholderimg,
            cost: 150,
            // category: "games",
            company:"Company B",
            companyId:2,
            stock: 48,
            Rating:2
          },
          {
            id: 411,
            name: "Product D11",
            description: "Description for Product D11",
            img: placeholderimg,
            cost: 150,
            // category: "games",
            company:"Company B",
            companyId:2,
            stock: 48,
            Rating:2
          },
        ]
    },
    {
        subcategoryId:16,
        subCategoryName: "Rings",
        category: "Accessories",
        categoryId:6,
        products:[
            {
                id: 108,
                name: "Product A8",
                description: "Description for Product A8",
                img:"/images/cardigan.jpeg",
                cost: 180,
                // category: "clothes",
                company:"Company B",
                companyId:2,
                // categoryId:2,
                stock: 30,
                Rating:2
              },
              {
                id: 405,
                name: "Product D5",
                description: "Description for Product D5",
                img: placeholderimg,
                cost: 95,
                // category: "accessories",
                company:"Company B",
                companyId:2,
                // categoryId:6,
                stock: 45,
                Rating:2
              },{
                id: 408,
                name: "Product D8",
                description: "Description for Product D8",
                img: placeholderimg,
                cost: 140,
                // category: "accessories",
                // categoryId:6,
                company:"Company B",
                companyId:2,
                stock: 42,
                Rating:2
              },
        ]
    },{
        subcategoryId:17,
        subCategoryName:"Headphones",
        category: "Electronics",
        categoryId:1,
        products:[{
            id: 406,
            name: "Product D6",
            description: "Description for Product D6",
            img: placeholderimg,
            cost: 130,
            // category: "electronics",
            company:"Company B",
            companyId:2,
            // categoryId:1,
            stock: 60,
            Rating:2
          }
        ]
    }
]

export default subcategoryProducts;