// Script pour trouver l'adresse IP locale
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Ignorer les adresses internes et IPv6
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({
          name: name,
          address: iface.address
        });
      }
    }
  }

  return addresses;
}

console.log('\n📍 Adresses IP disponibles pour accéder à l\'application:\n');

const addresses = getLocalIP();

if (addresses.length === 0) {
  console.log('❌ Aucune adresse IP réseau trouvée.');
  console.log('   Vous pouvez toujours accéder à http://localhost:3000\n');
} else {
  addresses.forEach((addr, index) => {
    console.log(`${index + 1}. Interface: ${addr.name}`);
    console.log(`   URL: http://${addr.address}:3000\n`);
  });

  console.log('💡 Donnez cette URL à vos élèves pour qu\'ils puissent accéder à l\'application.\n');
}

console.log('🏠 Accès local: http://localhost:3000\n');
