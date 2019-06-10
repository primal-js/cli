
function componentKey(component) {
  return `${component.name}@${component.version}`
}

function createComponentsHashmap(components) {
  const componentsHashmap = new Map()

  components.forEach(component => {
    const key = componentKey(component)

    componentsHashmap.set(key, component)
  })
  return componentsHashmap
}

function validateDependencies(components) {
  const componentsHashmap = createComponentsHashmap(components)

  components.forEach(component => {
    component.dependencies.forEach(dependency => {
      const key = componentKey(dependency)

      if (!componentsHashmap.has(key)) {
        throw new Error(`Component dependency not declared: ${key}`)
      }
    })
  })
}

module.exports = validateDependencies