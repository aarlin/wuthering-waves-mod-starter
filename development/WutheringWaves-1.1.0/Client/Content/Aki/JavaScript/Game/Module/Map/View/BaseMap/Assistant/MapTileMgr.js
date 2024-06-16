"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapTileMgr = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
	Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D"),
	StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
	EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
	GlobalData_1 = require("../../../../../GlobalData"),
	LevelConditionRegistry_1 = require("../../../../../LevelGamePlay/LevelConditions/LevelConditionRegistry"),
	ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
	ModelManager_1 = require("../../../../../Manager/ModelManager"),
	LguiUtil_1 = require("../../../../Util/LguiUtil"),
	MapDefine_1 = require("../../../MapDefine"),
	MapUtil_1 = require("../../../MapUtil"),
	FAKE_TILE_COUNT = 2,
	MAP_TILE_COMMON = "T_CommonDefault_UI",
	MAX_COLOR = 255,
	FOG_TEXTURE_NAME = new UE.FName("FogTexture"),
	HD_TEXTURE_NAME = new UE.FName("HDTexture"),
	HD_SCALAR_NAME = new UE.FName("UseHDPicture");
class FogOpenParams {
	constructor() {
		(this.ExtraHdMapTileIndex = -1),
			(this.MapTileIndex = -1),
			(this.Channel = 0);
	}
}
class MapTileMgr {
	constructor(i, t, e, s, h) {
		(this.iDi = void 0),
			(this.rDi = void 0),
			(this.oDi = void 0),
			(this.ZLi = new Map()),
			(this.YLi = void 0),
			(this.OpenArea = void 0),
			(this.zLi = void 0),
			(this.nDi = void 0),
			(this.sDi = void 0),
			(this.aDi = void 0),
			(this.JLi = 2),
			(this.hDi = new UE.Color(0, 0, 0, MAX_COLOR)),
			(this.MapOffset = void 0),
			(this.FakeOffset = 0),
			(this.lDi = Number.MAX_SAFE_INTEGER),
			(this._Di = Number.MAX_SAFE_INTEGER),
			(this.uDi = Number.MAX_SAFE_INTEGER),
			(this.cDi = Number.MAX_SAFE_INTEGER),
			(this.mDi = 0),
			(this.dDi = void 0),
			(this.CDi = void 0),
			(this.gDi = void 0),
			(this.fDi = !1),
			(this.pDi = () => {
				this.rDi &&
					(this.rDi.GetOwner()?.K2_DestroyActor(), (this.rDi = void 0)),
					this.vDi().finally(void 0);
			}),
			(this.MDi = (i) => {
				this.OpenArea && (this.OpenArea.add(i), this.EDi());
			}),
			(this.SDi = (i) => {
				if (this.CDi && 0 !== this.CDi.length && this.iDi)
					for (const e of this.CDi) {
						var t = e.MapTileIndex;
						0 <= t &&
							t < this.iDi.length &&
							((t = this.iDi[t]), this.yDi(t, e.Channel, i));
					}
			}),
			(this.nDi = i),
			(this.sDi = t),
			(this.aDi = e),
			this.aDi.SetColor(this.hDi),
			(this.JLi = s),
			(this.mDi =
				ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId),
			h && (this.ZLi = h);
	}
	IDi() {
		(this.iDi = []),
			(this.YLi = []),
			(this.MapOffset = new UE.Vector4(0, 0, 0, 0)),
			(this.FakeOffset = 0);
	}
	Initialize() {
		this.IDi(), this.bme();
	}
	Dispose() {
		this.qme(),
			this.YLi && (this.YLi.splice(0, this.YLi.length), (this.YLi = void 0)),
			this.iDi.forEach((i) => {
				i.SetTexture(void 0),
					i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, void 0),
					i.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, void 0),
					this.aDi !== i && i.GetOwner()?.K2_DestroyActor();
			}),
			this.rDi?.GetOwner()?.K2_DestroyActor(),
			(this.iDi = void 0);
	}
	bme() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.MapOpenAreaChange,
			this.MDi,
		),
			(this.oDi = new LevelConditionRegistry_1.ConditionPassCallback(this.pDi));
		for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
			var i = t.ConditionId;
			0 < i &&
				LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
					i,
					this.oDi,
				);
		}
	}
	qme() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.MapOpenAreaChange,
			this.MDi,
		);
		for (const t of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
			var i = t.ConditionId;
			0 < i &&
				LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
					i,
					this.oDi,
				);
		}
	}
	GetMapTiles() {
		return this.iDi;
	}
	OnMapSetUp() {
		1 === this.JLi && this.mDi !== MapDefine_1.BIG_WORLD_MAP_ID
			? (this.fDi = !1)
			: ((this.fDi = !0),
				this.TDi(),
				this.LDi(),
				(this.lDi = Number.MAX_SAFE_INTEGER),
				(this._Di = Number.MAX_SAFE_INTEGER));
	}
	DDi(i, t) {
		return 1 === this.JLi ? t : i;
	}
	TDi() {
		this.OpenArea = new Set();
		for (var [i] of ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas())
			this.OpenArea.add(i);
	}
	LDi() {
		var i,
			t,
			e,
			s,
			h,
			a = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfig();
		this.YLi.splice(0, this.YLi.length);
		for (const D of a)
			StringUtils_1.StringUtils.IsEmpty(D.MapTilePath) ||
				((i = (i = D.MapTilePath.split("/"))[i.length - 1]),
				(e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					D.MapTilePath,
				)),
				(h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					D.MiniMapTilePath,
				)),
				(t = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					D.HdMapTilePath,
				)),
				(e = this.DDi(e, h)),
				(h = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					D.FogTilePath,
				)),
				(s = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					D.MiniFogTilePath,
				)),
				(h = this.DDi(h, s)),
				this.YLi.push({
					MapTilePath: e,
					HdMapTilePath: t,
					FogTilePath: h,
					MapTileName: i,
				}));
		let r = 0,
			n = 0;
		if (1 === this.JLi) r = 4;
		else {
			this.zLi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 };
			for (const T of this.YLi) {
				var _ = this.tDi(T.MapTileName),
					o = _.X,
					_ = _.Y;
				(this.zLi.MaxX = Math.max(o, this.zLi.MaxX)),
					(this.zLi.MinX = Math.min(o, this.zLi.MinX)),
					(this.zLi.MaxY = Math.max(_, this.zLi.MaxY)),
					(this.zLi.MinY = Math.min(_, this.zLi.MinY));
			}
			n = this.zLi.MaxX - this.zLi.MinX + 1 + 2 * FAKE_TILE_COUNT;
			a = this.zLi.MaxY - this.zLi.MinY + 1 + 2 * FAKE_TILE_COUNT;
			r = n * a;
		}
		(this.iDi.length = 0), this.iDi.push(this.aDi);
		for (let i = 1; i < r; ++i) {
			var M = LguiUtil_1.LguiUtil.CopyItem(this.aDi, this.sDi);
			this.iDi.push(M);
		}
		var v = new Map();
		for (const c of this.YLi) {
			var f = this.tDi(c.MapTileName);
			v.set(f.X + "_" + f.Y, c);
		}
		var g,
			l,
			p,
			E,
			U,
			C = Vector2D_1.Vector2D.Create();
		for (let i = 0; i < this.iDi.length; i++) {
			const L = this.iDi[i];
			if (
				(L.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
				L.SetHeight(MapDefine_1.DETAIL_TILE_SPACE),
				1 === this.JLi)
			)
				this.RDi(L);
			else {
				var d = Math.ceil((i + 1) / n),
					u = i - (d - 1) * n + this.zLi.MinX - FAKE_TILE_COUNT,
					d = -(d - 1) + this.zLi.MaxY + FAKE_TILE_COUNT;
				(C.X = (u - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
					(C.Y = (d - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
					L.SetAnchorOffset(C.ToUeVector2D());
				const O = v.get(u + "_" + d);
				u = (i) => {
					i?.IsValid()
						? (L.SetTexture(i),
							StringUtils_1.StringUtils.IsEmpty(O.FogTilePath)
								? L.SetColor(this.hDi)
								: this.UDi(L, O.FogTilePath))
						: Log_1.Log.CheckDebug() &&
							Log_1.Log.Debug("Map", 35, "textureObject is invalid");
				};
				L.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 0),
					O && !StringUtils_1.StringUtils.IsEmpty(O.MapTilePath)
						? ((d = this.ZLi.get(O.MapTilePath))
								? u(d)
								: ResourceSystem_1.ResourceSystem.LoadAsync(
										O.MapTilePath,
										UE.Texture,
										u,
										102,
									),
							ModelManager_1.ModelManager.PlatformModel.IsPc() &&
								!StringUtils_1.StringUtils.IsEmpty(O.HdMapTilePath) &&
								2 === this.JLi &&
								((d = (i) => {
									L.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 1),
										L.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, i);
								}),
								this.ZLi.has(O.HdMapTilePath)
									? d(this.ZLi.get(O.HdMapTilePath))
									: ResourceSystem_1.ResourceSystem.LoadAsync(
											O.HdMapTilePath,
											UE.Texture,
											d,
											102,
										)))
						: (L.SetTexture(void 0), L.SetColor(this.hDi));
			}
		}
		this.vDi().finally(void 0),
			1 !== this.JLi &&
				((a = this.zLi.MaxX),
				(g = 1 - this.zLi.MinX),
				(l = Math.max(a, g)),
				(p = this.zLi.MaxY),
				(E = 1 - this.zLi.MinY),
				(U = Math.max(p, E)),
				this.nDi.SetWidth(2 * l * MapDefine_1.DETAIL_TILE_REALSIZE),
				this.nDi.SetHeight(2 * U * MapDefine_1.DETAIL_TILE_REALSIZE),
				this.MapOffset.Set(
					Math.max(0, a - g) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
					Math.max(0, g - a) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
					Math.max(0, E - p) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
					Math.max(0, p - E) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
				),
				(this.FakeOffset = MapDefine_1.DETAIL_TILE_REALSIZE * FAKE_TILE_COUNT));
	}
	tDi(i) {
		i = i.split("_");
		return {
			X: UE.KismetStringLibrary.Conv_StringToInt(i[2]),
			Y: UE.KismetStringLibrary.Conv_StringToInt(i[3]),
		};
	}
	UDi(t, i, e) {
		var s = (i) => {
				i ? this.RDi(t, i) : t.SetColor(this.hDi), e && e();
			},
			h = this.ZLi.get(i);
		h ? s(h) : ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.Texture, s, 102);
	}
	async vDi() {
		this.rDi && (this.rDi.GetOwner()?.K2_DestroyActor(), (this.rDi = void 0));
		var i = ModelManager_1.ModelManager.MapModel.GetCurMapBorderId(),
			i =
				ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(
					i,
				).PrefabPath,
			i = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, this.nDi);
		(this.rDi = i.GetComponentByClass(UE.UIItem.StaticClass())),
			this.rDi.SetAnchorOffset(new UE.Vector2D(0, 0));
	}
	UpdateMinimapTiles(i) {
		if (1 === this.JLi && this.fDi) {
			var t = MapUtil_1.MapUtil.GetTilePosition(i, 0.5),
				e = t.X,
				t = t.Y;
			if (
				!(
					Math.abs(this.uDi - i.X) <
						MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
					Math.abs(this.cDi - i.Y) <
						MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
					this.lDi === e &&
					this._Di === t
				)
			) {
				var s = [e, t, e - 1, t, e, t - 1, e - 1, t - 1],
					h = Vector2D_1.Vector2D.Create(i),
					a =
						(h.DivisionEqual(
							MapDefine_1.DETAIL_TILE_REALSIZE * MapDefine_1.UNIT,
						),
						h.X - e + 1),
					h = h.Y + t,
					i =
						((this.uDi = i.X),
						(this.cDi = i.Y),
						MapDefine_1.MINI_MAP_RADIUS / MapDefine_1.DETAIL_TILE_REALSIZE),
					r = Math.min(a + i, 1),
					n = Math.max(a - i, 0),
					_ = Math.min(h + i, 1),
					o = Math.max(h - i, 0),
					r = new UE.LinearColor(r - n, _ - o, n, o),
					_ = new UE.LinearColor(2 * i - r.R, r.G, Math.min(1 - i + a, 1), o),
					a = new UE.LinearColor(r.R, 2 * i - r.G, n, Math.max(h - i - 1, 0)),
					M = [r, _, a, new UE.LinearColor(_.R, a.G, _.B, a.A)],
					v = Vector2D_1.Vector2D.Create();
				for (let i = 0; i < this.iDi.length; i++) {
					this.iDi[i].SetWidth(
						Math.max(M[i].R * MapDefine_1.DETAIL_TILE_REALSIZE, 0),
					),
						this.iDi[i].SetHeight(
							Math.max(M[i].G * MapDefine_1.DETAIL_TILE_REALSIZE, 0),
						);
					var f = s[2 * i],
						g = s[2 * i + 1];
					(v.X =
						(f - 0.5 - 0.5 + M[i].B + M[i].R / 2) *
						MapDefine_1.DETAIL_TILE_SPACE),
						(v.Y =
							(g - 0.5 + 0.5 - M[i].A - M[i].G / 2) *
							MapDefine_1.DETAIL_TILE_SPACE),
						this.iDi[i].SetAnchorOffset(v.ToUeVector2D()),
						this.iDi[i].SetCustomMaterialVectorParameter(
							new UE.FName("UVCorrect"),
							M[i],
						);
				}
				if (this.lDi !== e || this._Di !== t) {
					(this.lDi = e), (this._Di = t);
					for (let t = 0; t < this.iDi.length; t++) {
						var l = s[2 * t],
							p = s[2 * t + 1],
							l = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
								l.toString() + "_" + p.toString(),
							);
						if (l && !StringUtils_1.StringUtils.IsEmpty(l.MapTilePath)) {
							var p =
									ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
										l.MapTilePath,
									),
								E =
									ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
										l.MiniMapTilePath,
									),
								U =
									ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
										l.FogTilePath,
									),
								l =
									ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
										l.MiniFogTilePath,
									),
								p = this.DDi(p, E);
							const C = this.DDi(U, l);
							ResourceSystem_1.ResourceSystem.LoadAsync(p, UE.Texture, (i) => {
								i?.IsValid() &&
									((i = i),
									this.iDi[t].SetTexture(i),
									StringUtils_1.StringUtils.IsEmpty(C)
										? this.iDi[t].SetColor(this.hDi)
										: this.UDi(this.iDi[t], C));
							});
						}
					}
				}
			}
		}
	}
	EDi() {
		for (const i of this.iDi) this.RDi(i);
	}
	HandleAreaOpen(t) {
		(this.CDi = []),
			this.dDi || (this.dDi = (0, puerts_1.toManualReleaseDelegate)(this.SDi));
		for (let i = 0; i < this.iDi.length; i++) {
			var e,
				s = this.iDi[i],
				s = this.ADi(s, t);
			void 0 !== s &&
				(((e = new FogOpenParams()).MapTileIndex = i),
				(e.Channel = s),
				this.CDi.push(e));
		}
		this.SDi(0);
	}
	ADi(i, t) {
		if (i && i.texture) {
			i = i.texture.GetName();
			if (i !== MAP_TILE_COMMON) {
				(i = this.tDi(i)),
					(i = i.X + "_" + i.Y),
					(i = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(i));
				if (i)
					return t === i.R
						? 0
						: t === i.G
							? 1
							: t === i.B
								? 2
								: t === i.Alpha
									? 3
									: void 0;
			}
		}
	}
	yDi(i, t, e) {
		var s = i.GetColor().ReinterpretAsLinear();
		switch (t) {
			case 0:
				s.R = e;
				break;
			case 1:
				s.G = e;
				break;
			case 2:
				s.B = e;
				break;
			case 3:
				s.A = e;
		}
		i.SetColor(s.ToFColor(!0));
	}
	HandleDelegate() {
		var i;
		this.dDi &&
			((i = ConfigManager_1.ConfigManager.MapConfig.GetMapDissolveTime()),
			this.gDi && this.gDi.Kill(),
			(this.gDi = UE.LTweenBPLibrary.FloatTo(
				GlobalData_1.GlobalData.World,
				this.dDi,
				0,
				1,
				i,
			)));
	}
	UnBindDelegate() {
		this.dDi &&
			((0, puerts_1.releaseManualReleaseDelegate)(this.SDi),
			(this.dDi = void 0)),
			this.gDi && (this.gDi.Kill(), (this.gDi = void 0));
	}
	RDi(i, t) {
		var e, s, h;
		i &&
			i.texture &&
			((h = i.texture.GetName()) !== MAP_TILE_COMMON &&
			((h = (h = this.tDi(h)).X + "_" + h.Y),
			(h = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(h)))
				? (t?.IsValid() &&
						i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, t),
					(t = this.OpenArea.has(h.R) ? MAX_COLOR : 0),
					(e = this.OpenArea.has(h.G) ? MAX_COLOR : 0),
					(s = this.OpenArea.has(h.B) ? MAX_COLOR : 0),
					(h = this.OpenArea.has(h.Alpha) ? MAX_COLOR : 0),
					(t = new UE.Color(t, e, s, h)),
					i.SetColor(t))
				: i.SetColor(this.hDi));
	}
}
exports.MapTileMgr = MapTileMgr;
//# sourceMappingURL=MapTileMgr.js.map
