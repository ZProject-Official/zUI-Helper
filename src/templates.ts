export const templates = [
  {
    label: "Basic Menu",
    description: "Structure vide d'un menu principal",
    content: `local zUI = exports["zUI-v2"]:getObject()

local menu = zUI.CreateMenu(
    "Mon Menu",
    "Sous-titre",
    "Description du menu",
    "default",
    "https://example.com/banner.png",
    "F5",
    "Ouvrir le menu"
)

zUI.SetItems(menu, function()
    zUI.Button("Premier Bouton", "Une description", {}, function(onSelected)
        if onSelected then
            print("Clic !")
        end
    end)
end)
`,
  },
  {
    label: "Vehicle Management (Exemple complet)",
    description: "Menu de gestion véhicule complet (Doc)",
    content: `local zUI = exports["zUI-v2"]:getObject()

local menu = zUI.CreateMenu("Véhicule", "Gestion du véhicule", "Intéractions disponibles :", "default", nil, "F5", "Ouvrir le menu")
local vehicules = {"Adder", "Zentorno", "T20", "Osiris"}
local vehiculeIndex = 1
local volumeRadio = 50
local couleurVehicule = "#FF0000"
local couleurs = {"#FF0000", "#00FF00", "#0000FF", "#FFFF00"}
local couleurIndex = 1
local godModeEnabled = false
local plaque = ""
local recherche = ""
local godModItem

zUI.SetItems(menu, function()
    -- Spawn du véhicule sélectionné
    zUI.Button("Faire apparaître", "Spawn le véhicule sélectionné", {}, function(onSelected)
        if onSelected then
            local vehicleHash = GetHashKey(vehicules[vehiculeIndex])
            RequestModel(vehicleHash)
            print("Véhicule spawn :", vehicules[vehiculeIndex])
        end
    end)

    -- God Mode sur le véhicule
    godModItem = zUI.Checkbox("God Mode Véhicule", "Rendre le véhicule invincible", godModeEnabled, {
        IsDisabled = false
    }, function(onSelected)
        if onSelected then
            godModeEnabled = not godModeEnabled
            print("God Mode Véhicule :", godModeEnabled)
        end
    end)

    -- Choix du modèle de véhicule
    zUI.List("Modèle", "Choisir le modèle de véhicule", vehicules, vehiculeIndex, {
        IsDisabled = false
    }, function(onSelected, onChange, index)
        if onChange then
            vehiculeIndex = index
        end
    end)

    -- Volume de la radio du véhicule
    zUI.Slider("Volume Radio", "Régler le volume de la radio", volumeRadio, 5, {
        IsDisabled = false,
        ShowPercentage = true
    }, function(onSelected, onChange, percentage)
        if onChange then
            volumeRadio = percentage
        end
    end)

    -- Couleur personnalisée
    zUI.ColorPicker("Couleur personnalisée", "Choisir une couleur personnalisée", couleurVehicule, {
        IsDisabled = false
    }, function(onChange, value)
        if onChange then
            couleurVehicule = value
        end
    end)

    zUI.Separator("AUTRES", "center")

    -- Changement de plaque
    zUI.TextArea("Plaque", "Définir la plaque d'immatriculation", plaque, "Ex: ZSQUAD", {
        IsDisabled = false
    }, function(onChange, value)
        if onChange then
            plaque = value
        end
    end)
end)
`,
  },
  {
    label: "Settings Menu",
    description: "Menu de configuration avec Checkbox et Sliders",
    content: `local zUI = exports["zUI-v2"]:getObject()

local settingsMenu = zUI.CreateMenu("Paramètres", "Configuration", "Gérez vos options", "default")

local config = {
    notifications = true,
    soundVolume = 80,
    themeColor = "#FF3837",
    quality = 1,
    qualityOptions = {"Basse", "Moyenne", "Haute", "Ultra"}
}

zUI.SetItems(settingsMenu, function()
    zUI.Separator("GÉNÉRAL", "left")

    zUI.Checkbox("Notifications", "Activer les notifications HUD", config.notifications, {}, function(onSelected)
        if onSelected then
            config.notifications = not config.notifications
        end
    end)

    zUI.Slider("Volume Sonore", "Volume des effets d'interface", config.soundVolume, 10, { ShowPercentage = true }, function(onSelected, onChange, pct)
        if onChange then config.soundVolume = pct end
    end)

    zUI.Separator("APPARENCE", "left")

    zUI.List("Qualité Graphique", "Niveau de détail", config.qualityOptions, config.quality, {}, function(onSelected, onChange, idx)
        if onChange then config.quality = idx end
    end)

    zUI.ColorPicker("Couleur d'accent", "Couleur principale de l'interface", config.themeColor, {}, function(onChange, val)
        if onChange then config.themeColor = val end
    end)
    
    zUI.Button("Sauvegarder", "Appliquer les modifications", { RightLabel = "💾" }, function(onSelected)
        if onSelected then
            print("Configuration sauvegardée")
            zUI.ShowInfoBox("Succès", "Configuration appliquée", "default", {{type="text", title="Statut", value="OK"}})
        end
    end)
end)
`,
  },
];
