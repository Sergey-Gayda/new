module.exports = {
   plugins: [
      require('autoprefixer')({
         browsers: ['last 3 versions', '> 1%']
      }),
      require('cssnano')(
         {preset: [
               'default',{
                  discardComments: {
                     removeAll: true,
                  }
               }
         ]}
      )
   ]
}