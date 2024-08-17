"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RenderConfig = exports.INVALID_SECTION_INDEX = void 0);
const UE = require("ue"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol");
exports.INVALID_SECTION_INDEX = 99999;
class RenderConfig {
	static GetBodyTypeByName(e) {
		return (
			this.Xhr ||
				(this.Xhr = new Map([
					["CharacterMesh0", 0],
					["WeaponCase0", 1],
					["WeaponCase1", 1],
					["WeaponCase2", 1],
					["WeaponCase3", 1],
					["WeaponCase4", 1],
					["HuluCase", 2],
					["OtherCase0", 3],
					["OtherCase1", 3],
					["OtherCase2", 3],
					["OtherCase3", 3],
					["OtherCase4", 3],
				])),
			this.Xhr.get(e)
		);
	}
	static GetEntityRenderPriority(e, n) {
		return e
			? 3
			: (this.$hr ||
					(this.$hr = new Map([
						[Protocol_1.Aki.Protocol.wks.Proto_Player, 1],
						[Protocol_1.Aki.Protocol.wks.Proto_Npc, 2],
						[Protocol_1.Aki.Protocol.wks.Proto_Monster, 4],
						[Protocol_1.Aki.Protocol.wks.Proto_Vision, 5],
						[Protocol_1.Aki.Protocol.wks.Proto_Animal, 6],
						[Protocol_1.Aki.Protocol.wks.Proto_SceneItem, 7],
						[Protocol_1.Aki.Protocol.wks.Proto_Custom, 8],
					])),
				(e = this.$hr.get(n)) || 0);
	}
	static GetBodyNamesByBodyType(e) {
		return (
			this.Yhr ||
				(this.Yhr = new Map([
					[0, RenderConfig.MaterialControlAllCaseArray],
					[1, RenderConfig.MaterialControlBodyCaseArray],
					[2, RenderConfig.MaterialControlWeaponCaseArray],
					[3, RenderConfig.MaterialControlHuluCaseArray],
					[5, RenderConfig.MaterialControlOtherCaseArray],
					[4, RenderConfig.MaterialControlWeaponAndHuluCaseArray],
				])),
			this.Yhr.get(e)
		);
	}
	static GetMaterialSlotType(e) {
		return e.startsWith("MI_")
			? 1
			: e.startsWith("OL_")
				? 2
				: e.startsWith("HETA_")
					? 4
					: e.startsWith("HET_")
						? 3
						: e.startsWith("FS_")
							? 5
							: 0;
	}
	static GetMaterialPartType(e) {
		return (e = e.toLocaleLowerCase()).includes("bang")
			? 0
			: e.includes("hair") || e.includes("fur")
				? 1
				: e.includes("head")
					? 2
					: e.includes("face")
						? 3
						: e.includes("eye")
							? 4
							: e.includes("body")
								? 5
								: e.includes("up")
									? 6
									: e.includes("down")
										? 7
										: e.includes("leg")
											? 8
											: e.includes("cloth")
												? 9
												: e.includes("skirt")
													? 10
													: e.includes("star")
														? 11
														: e.includes("core")
															? 12
															: e.includes("hand")
																? 13
																: e.includes("wing")
																	? 14
																	: e.includes("prop")
																		? 15
																		: e.includes("weapon")
																			? 16
																			: 17;
	}
}
((exports.RenderConfig = RenderConfig).UseCharUnrealCacheObject = !0),
	(RenderConfig.MaterialControlAllCaseArray = [
		"CharacterMesh0",
		"WeaponCase0",
		"WeaponCase1",
		"WeaponCase2",
		"WeaponCase3",
		"WeaponCase4",
		"HuluCase",
		"OtherCase0",
		"OtherCase1",
		"OtherCase2",
		"OtherCase3",
		"OtherCase4",
	]),
	(RenderConfig.MaterialControlBodyCaseArray = ["CharacterMesh0"]),
	(RenderConfig.MaterialControlWeaponCaseArray = [
		"WeaponCase0",
		"WeaponCase1",
		"WeaponCase2",
		"WeaponCase3",
		"WeaponCase4",
	]),
	(RenderConfig.MaterialControlHuluCaseArray = ["HuluCase"]),
	(RenderConfig.MaterialControlWeaponAndHuluCaseArray = [
		"WeaponCase0",
		"WeaponCase1",
		"WeaponCase2",
		"WeaponCase3",
		"WeaponCase4",
		"HuluCase",
	]),
	(RenderConfig.MaterialControlOtherCaseArray = [
		"OtherCase0",
		"OtherCase1",
		"OtherCase2",
		"OtherCase3",
		"OtherCase4",
	]),
	(RenderConfig.CharMaterialContainerDataPath =
		"/Game/Aki/Render/RuntimeBP/Character/MaterialContainer/DA_CharacterMaterialContainerData.DA_CharacterMaterialContainerData"),
	(RenderConfig.HolographicPath =
		"/Game/Aki/Effect/EffectGroup/Sequence/Common/DA_Fx_Group_Seq_Communicate.DA_Fx_Group_Seq_Communicate"),
	(RenderConfig.RefErrorCount = 20),
	(RenderConfig.UseRim = new UE.FName("E_Rim_UseRim")),
	(RenderConfig.RimUseTex = new UE.FName("E_Rim_UseTex")),
	(RenderConfig.RimChannel = new UE.FName("E_Rim_Channel")),
	(RenderConfig.RimRange = new UE.FName("E_Rim_RimRange")),
	(RenderConfig.RimColor = new UE.FName("E_Rim_RimColor")),
	(RenderConfig.RimIntensity = new UE.FName("E_Rim_Intensity")),
	(RenderConfig.UseDissolve = new UE.FName("E_Dissolve_UseDissolve")),
	(RenderConfig.DissolveChannelSwitch = new UE.FName("E_Dissolve_Channel")),
	(RenderConfig.DissolveProgress = new UE.FName("E_Dissolve_Progress")),
	(RenderConfig.DissolveSmooth = new UE.FName("E_Dissolve_Smooth")),
	(RenderConfig.DissolveMulti = new UE.FName("E_Dissolve_Multi")),
	(RenderConfig.DissolveEmission = new UE.FName("E_Dissolve_Emission")),
	(RenderConfig.OutlineUseTex = new UE.FName("E_Outline_UseTex")),
	(RenderConfig.OutlineWidth = new UE.FName("MaxOutlineWidth")),
	(RenderConfig.OutlineColor = new UE.FName("E_Outline_EmissionColor")),
	(RenderConfig.OutlineColorIntensity = new UE.FName(
		"E_Outline_EmissionIntensity",
	)),
	(RenderConfig.UseTexture = new UE.FName("E_Tex_UseTex")),
	(RenderConfig.TextureUseMask = new UE.FName("E_Tex_UseMask")),
	(RenderConfig.TextureMaskRange = new UE.FName("E_Tex_MaskRange")),
	(RenderConfig.NoiseTexture = new UE.FName("E_Tex_NoiseTex")),
	(RenderConfig.TextureUvSwitch = new UE.FName("E_Tex_UVSwitch")),
	(RenderConfig.TextureUseScreenUv = new UE.FName("E_Tex_UseScreenUV")),
	(RenderConfig.TextureScaleAndOffset = new UE.FName("E_Tex_ScaleAndOffset")),
	(RenderConfig.TextureSpeed = new UE.FName("E_Tex_Speed")),
	(RenderConfig.TextureColor = new UE.FName("E_Tex_Color")),
	(RenderConfig.TextureRotation = new UE.FName("E_Tex_Rotation")),
	(RenderConfig.BaseUseTex = new UE.FName("E_Base_UseTex")),
	(RenderConfig.BaseColor = new UE.FName("E_Base_Color")),
	(RenderConfig.BaseColorIntensity = new UE.FName("E_Base_Intensity")),
	(RenderConfig.EmissionUseTex = new UE.FName("E_Emission_UseTex")),
	(RenderConfig.EmissionColor = new UE.FName("E_Emission_Color")),
	(RenderConfig.EmissionIntensity = new UE.FName("E_Emission_Intensity")),
	(RenderConfig.UseDitherEffect = new UE.FName("E_Dither_UseDither")),
	(RenderConfig.DitherValue = new UE.FName("E_Dither_DitherValue")),
	(RenderConfig.UseDitherEffect2 = new UE.FName("E_Dither_UseDither2")),
	(RenderConfig.DitherValue2 = new UE.FName("E_Dither_DitherValue2")),
	(RenderConfig.CharacterAmbientColor = new UE.FName("CharacterAmbientColor")),
	(RenderConfig.CharacterSkinAmbientColor = new UE.FName(
		"CharacterSkinAmbientColor",
	)),
	(RenderConfig.EnableTransfer = new UE.FName("E_Transfer_Enable")),
	(RenderConfig.TransferDensity = new UE.FName("E_Transfer_Density")),
	(RenderConfig.TransferHardness = new UE.FName("E_Transfer_Hardness")),
	(RenderConfig.TransferDirection = new UE.FName("E_Transfer_Direction")),
	(RenderConfig.TransferHeight = new UE.FName("E_Transfer_Height")),
	(RenderConfig.TransferOutlineColor = new UE.FName("E_Transfer_OutlineColor")),
	(RenderConfig.MotionRange = new UE.FName("E_MotionRange")),
	(RenderConfig.MotionOffset = new UE.FName("E_Motion_Offset")),
	(RenderConfig.MotionNoiseSpeed = new UE.FName("E_Motion_NoiseSpeed")),
	(RenderConfig.StarScarEnergyControl = new UE.FName("XingHenControl")),
	(RenderConfig.RootName = new UE.FName("Root")),
	(RenderConfig.UIName = new UE.FName("UI")),
	(RenderConfig.GlobalRainIntensity = new UE.FName("GlobalRainIntensity")),
	(RenderConfig.GlobalSnowIntensity = new UE.FName("GlobalSnowIntensity")),
	(RenderConfig.GlobalGrassAO = new UE.FName("GlobalGrassAO")),
	(RenderConfig.GlobalMainLightVector = new UE.FName(
		"GlobalSceneMainLightDirection",
	)),
	(RenderConfig.GlobalLensFlareColorTint = new UE.FName(
		"GlobalLensFlareColorTint",
	)),
	(RenderConfig.GlobalCharacterPreviousWP = new UE.FName(
		"GlobalCharacterPreviousWP",
	)),
	(RenderConfig.GlobalCharacterWorldPosition = new UE.FName(
		"GlobalCharacterWorldPosition",
	)),
	(RenderConfig.GlobalCharacterWorldForwardDirection = new UE.FName(
		"GlobalCharacterWorldForwardDirection",
	)),
	(RenderConfig.GlobalCameraPosAndRadius = new UE.FName(
		"GlobalCameraPosAndRadius",
	)),
	(RenderConfig.UseSocketTransform = new UE.FName("UseSocketTransform")),
	(RenderConfig.UseClipboardTransform = new UE.FName("UseClipboardTransform")),
	(RenderConfig.UseSocketTransform2 = new UE.FName("使用插槽变换信息")),
	(RenderConfig.UseClipboardTransform2 = new UE.FName("使用剪切板变换信息")),
	(RenderConfig.PhysicsActor = new UE.FName("PhysicsActor")),
	(RenderConfig.WaterCollisionProfileName = new UE.FName("水体")),
	(RenderConfig.UIShowBrightness = new UE.FName("Lumin")),
	(RenderConfig.GlobalTimeHour = new UE.FName("GlobalTimeHour")),
	(RenderConfig.GlobalTimeMinutes = new UE.FName("GlobalTimeMinutes")),
	(RenderConfig.IdMaterialContainer = 1),
	(RenderConfig.IdMaterialController = 2),
	(RenderConfig.IdDitherEffect = 3),
	(RenderConfig.IdBadSignal = 4),
	(RenderConfig.IdSceneInteraction = 5),
	(RenderConfig.IdPropertyModifier = 6),
	(RenderConfig.IdComplexBroken = 7),
	(RenderConfig.IdNpcDitherEffect = 8),
	(RenderConfig.IdBodyEffect = 9),
	(RenderConfig.IdDecalShadow = 10),
	(RenderConfig.EmptyMaterialPath =
		"/Game/Aki/Render/Shaders/Character/MI_Empty"),
	(RenderConfig.E_Action_UseBaseColorScale = new UE.FName(
		"E_Action_UseBaseColorScale",
	)),
	(RenderConfig.E_Action_BaseColorScale = new UE.FName(
		"E_Action_BaseColorScale",
	)),
	(RenderConfig.E_Action_UseEmissionColor = new UE.FName(
		"E_Action_UseEmissionColor",
	)),
	(RenderConfig.E_Action_EmissionColor = new UE.FName(
		"E_Action_EmissionColor",
	)),
	(RenderConfig.E_Action_UseRimLight = new UE.FName("E_Action_UseRimLight")),
	(RenderConfig.E_Action_RimLightColor = new UE.FName(
		"E_Action_RimLightColor",
	)),
	(RenderConfig.E_Action_RimPower = new UE.FName("E_Action_RimPower")),
	(RenderConfig.E_Action_UseEmissionChange = new UE.FName(
		"E_Action_UseEmissionChange",
	)),
	(RenderConfig.E_Action_EmissionLightColorChangeColor = new UE.FName(
		"E_Action_EmissionLightColorChangeColor",
	)),
	(RenderConfig.E_Action_EmissionLightColorChangeStrength = new UE.FName(
		"E_Action_EmissionLightColorChangeStrength",
	)),
	(RenderConfig.E_Action_EmissionLightColorChangeProgress = new UE.FName(
		"E_Action_EmissionLightColorChangeProgress",
	)),
	(RenderConfig.E_Action_UseDissolve = new UE.FName("E_Action_UseDissolve")),
	(RenderConfig.E_Action_DissolveProgress = new UE.FName(
		"E_Action_DissolveProgress",
	)),
	(RenderConfig.E_Action_DissolveAdjustment = new UE.FName(
		"E_Action_DissolveAdjustment",
	)),
	(RenderConfig.E_Action_DissolveEdageWidth = new UE.FName(
		"E_Action_DissolveEdageWidth",
	)),
	(RenderConfig.E_Action_DissolveEdageColor = new UE.FName(
		"E_Action_DissolveEdageColor",
	)),
	(RenderConfig.E_Action_DissolveEdageStrength = new UE.FName(
		"E_Action_DissolveEdageStrength",
	)),
	(RenderConfig.E_Action_DissolveTex_S_O = new UE.FName(
		"E_Action_DissolveTex_S_O",
	)),
	(RenderConfig.E_Action_DissolveTexSpeed = new UE.FName(
		"E_Action_DissolveTexSpeed",
	)),
	(RenderConfig.E_Tex_DissolveTexUVSwitch = new UE.FName(
		"E_Tex_DissolveTexUVSwitch",
	)),
	(RenderConfig.E_Action_ScanningOutlineMixNoiseStrength = new UE.FName(
		"E_Action_ScanningOutlineMixNoiseStrength",
	)),
	(RenderConfig.E_Action_GlobalBaseColorScale = new UE.FName(
		"E_Action_GlobalBaseColorScale",
	)),
	(RenderConfig.E_Action_GlobalAddEmissionColor = new UE.FName(
		"E_Action_GlobalAddEmissionColor",
	)),
	(RenderConfig.E_Action_ScanningOutline = new UE.FName(
		"E_Action_ScanningOutline",
	)),
	(RenderConfig.E_Action_GlobalRimLight = new UE.FName(
		"E_Action_GlobalRimLight",
	)),
	(RenderConfig.E_Action_UseScanning = new UE.FName("E_Action_UseScanning")),
	(RenderConfig.E_Action_RimMix = new UE.FName("E_Action_RimMix")),
	(RenderConfig.E_Action_ScanningOutlineStrength = new UE.FName(
		"E_Action_ScanningOutlineStrength",
	)),
	(RenderConfig.E_Action_ScanningTex_S_O = new UE.FName(
		"E_Action_ScanningTex_S_O",
	)),
	(RenderConfig.E_Action_ScanningOutlineColor = new UE.FName(
		"E_Action_ScanningOutlineColor",
	)),
	(RenderConfig.E_Action_RimWidth = new UE.FName("E_Action_RimWidth")),
	(RenderConfig.BrokenTex_S_O = new UE.FName("BrokenTex_S_O")),
	(RenderConfig.OutlineTex_S_O = new UE.FName("OutlineTex_S_O")),
	(RenderConfig.E_Action_VertexAnim_TimeDebug = new UE.FName(
		"E_Action_VertexAnim_TimeDebug",
	)),
	(RenderConfig.E_Action_VertexAnim_Frame = new UE.FName(
		"E_Action_VertexAnim_Frame",
	)),
	(RenderConfig.E_Action_PivotPainterTransform = new UE.FName(
		"E_Action_PivotPainterTransform",
	)),
	(RenderConfig.E_Action_PivotPainter_FloatingThreshold = new UE.FName(
		"E_Action_PivotPainter_FloatingThreshold",
	)),
	(RenderConfig.E_Action_UsePivotPainterWorldPositionOffset = new UE.FName(
		"E_Action_UsePivotPainterWorldPositionOffset",
	)),
	(RenderConfig.E_Action_UseWPO = new UE.FName("E_Action_UseWPO")),
	(RenderConfig.E_Action_DisableFoliageEffect = new UE.FName(
		"E_Action_DisableFoliageEffect",
	)),
	(RenderConfig.E_Action_EnableFoliageEffect = new UE.FName(
		"E_Action_EnableFoliageEffect",
	)),
	(RenderConfig.E_Action_RimLightColorSpecil = new UE.FName(
		"E_Action_RimLightColorSpecil",
	)),
	(RenderConfig.E_Action_UseRimlightColorSpecil = new UE.FName(
		"E_Action_UseRimlightColorSpecil",
	)),
	(RenderConfig.E_Action_RimlightColorStrength = new UE.FName(
		"E_Action_RimlightColorStrength",
	)),
	(RenderConfig.E_Action_SimpleWPO_Normal = new UE.FName(
		"E_Action_SimpleWPO_Normal",
	)),
	(RenderConfig.E_Action_SimpleWPO_Offset = new UE.FName(
		"E_Action_SimpleWPO_Offset",
	)),
	(RenderConfig.E_Action_UseEmissionTex = new UE.FName(
		"E_Action_UseEmissionTex",
	)),
	(RenderConfig.E_Action_EmissionTexStrength = new UE.FName(
		"E_Action_EmissionTexStrength",
	)),
	(RenderConfig.E_Action_Simple_Uspeed = new UE.FName(
		"E_Action_Simple_Uspeed",
	)),
	(RenderConfig.E_Action_Simple_Vspeed = new UE.FName(
		"E_Action_Simple_Vspeed",
	)),
	(RenderConfig.E_Action_Simple_UseFlow = new UE.FName(
		"E_Action_Simple_UseFlow",
	)),
	(RenderConfig.E_Action_UseQuanXiPinTu = new UE.FName(
		"E_Action_UseQuanXiPinTu",
	)),
	(RenderConfig.E_Action_TransparencyQuanXiPinTu = new UE.FName(
		"E_Action_TransparencyQuanXiPinTu",
	)),
	(RenderConfig.E_Action_TransparentColorQuanXiPinTu = new UE.FName(
		"E_Action_TransparentColorQuanXiPinTu",
	)),
	(RenderConfig.E_Action_OpaqueColorQuanXiPinTu = new UE.FName(
		"E_Action_OpaqueColorQuanXiPinTu",
	)),
	(RenderConfig.E_Action_UseQuanXiFengSuo = new UE.FName(
		"E_Action_UseQuanXiFengSuo",
	)),
	(RenderConfig.E_Action_TransparencyQuanXiFengSuo = new UE.FName(
		"E_Action_TransparencyQuanXiFengSuo",
	)),
	(RenderConfig.E_Action_TransparentColorQuanXiFengSuo = new UE.FName(
		"E_Action_TransparentColorQuanXiFengSuo",
	));
