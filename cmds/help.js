const menus = {
  main: `
    primaljs [command] <options>

    upload .............. begins uploading files declared in the manifest
    help ............... show help menu for a command`,

  upload: `
    primaljs upload <options>

    --manfiest, -m ..... path to manifest file; defaults to <root_folder>/primaljs-manifest.json
    --token, -t ........ project token; if not specified, will look for 'projectToken' value in your manifest file
  `,
}

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

  console.log(menus[subCmd] || menus.main)
}
