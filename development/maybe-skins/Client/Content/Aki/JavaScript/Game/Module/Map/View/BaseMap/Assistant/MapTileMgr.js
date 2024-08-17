"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MapTileMgr = void 0);
const puerts_1 = require("puerts"),
	UE = require("ue"),
	Log_1 = require("../../../../../../Core/Common/Log"),
	ConfigCommon_1 = require("../../../../../../Core/Config/ConfigCommon"),
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
	constructor(i, e, t, a, s, n, o, r) {
		(this.qRi = void 0),
			(this.GRi = void 0),
			(this.w5s = void 0),
			(this.NRi = void 0),
			(this.ORi = void 0),
			(this.wRi = new Map()),
			(this.ARi = void 0),
			(this.OpenArea = void 0),
			(this.xRi = void 0),
			(this.kRi = void 0),
			(this.FRi = void 0),
			(this.VRi = void 0),
			(this.HRi = void 0),
			(this.jRi = void 0),
			(this.Y6s = void 0),
			(this.b5s = void 0),
			(this.q5s = 0),
			(this.PRi = 2),
			(this.WRi = new UE.Color(0, 0, 0, 255)),
			(this.jRn = new Map()),
			(this.zRn = new Map()),
			(this.ZRn = -1),
			(this.MapOffset = void 0),
			(this.FakeOffset = 0),
			(this.KRi = Number.MAX_SAFE_INTEGER),
			(this.QRi = Number.MAX_SAFE_INTEGER),
			(this.XRi = Number.MAX_SAFE_INTEGER),
			(this.$Ri = Number.MAX_SAFE_INTEGER),
			(this.YRi = 0),
			(this.JRi = void 0),
			(this.zRi = void 0),
			(this.ZRi = void 0),
			(this.eUi = !1),
			(this.A4s = void 0),
			(this.U4s = void 0),
			(this.G5s = void 0),
			(this.tUi = () => {
				this.NRi &&
					(this.NRi.GetOwner()?.K2_DestroyActor(), (this.NRi = void 0)),
					this.iUi();
			}),
			(this.oUi = (i) => {
				this.OpenArea && (this.OpenArea.add(i), this.rUi());
			}),
			(this.C5s = (i) => {
				if (this.OpenArea) {
					this.OpenArea.clear();
					for (const e of i.keys()) this.OpenArea.add(e);
					this.rUi();
				}
			}),
			(this.nUi = (i) => {
				if (this.zRi && 0 !== this.zRi.length && this.qRi)
					for (const t of this.zRi) {
						var e = t.MapTileIndex;
						0 <= e &&
							e < this.qRi.length &&
							((e = this.qRi[e]), this.sUi(e, t.Channel, i));
					}
			}),
			(this.kRi = i),
			(this.A4s = UE.NewArray(UE.UIItem)),
			this.A4s.Add(i),
			(this.U4s = (0, puerts_1.$ref)(this.A4s)),
			(this.FRi = e),
			(this.VRi = t),
			(this.HRi = a),
			(this.jRi = s),
			(this.b5s = a
				?.GetOwner()
				.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass())),
			(this.q5s = a
				?.GetOwner()
				.GetComponentByClass(UE.UISprite.StaticClass())
				?.GetAlpha()),
			(this.Y6s = r),
			this.Y6s?.SetWidth(MapDefine_1.DETAIL_TILE_REALSIZE),
			this.Y6s?.SetHeight(MapDefine_1.DETAIL_TILE_REALSIZE),
			this.VRi.SetColor(this.WRi),
			(this.PRi = n),
			(this.YRi =
				ModelManager_1.ModelManager.GameModeModel.InstanceDungeon.MapConfigId),
			o && (this.wRi = o);
	}
	aUi() {
		(this.qRi = []),
			(this.GRi = []),
			(this.w5s = []),
			(this.ARi = []),
			(this.MapOffset = new UE.Vector4(0, 0, 0, 0)),
			(this.FakeOffset = 0);
	}
	Initialize() {
		this.aUi(), this.dde();
	}
	Dispose() {
		this.Cde(),
			this.ARi && (this.ARi.splice(0, this.ARi.length), (this.ARi = void 0)),
			this.qRi.forEach((i) => {
				i.SetTexture(void 0),
					i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, void 0),
					i.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, void 0),
					this.VRi !== i && i.GetOwner()?.K2_DestroyActor();
			}),
			this.GRi.forEach((i) => {
				i.SetTexture(void 0), this.jRi !== i && i.GetOwner()?.K2_DestroyActor();
			}),
			this.O5s(),
			this.HRi?.SetAlpha(this.q5s),
			this.HRi?.SetUIActive(!1),
			this.NRi?.GetOwner()?.K2_DestroyActor(),
			(this.qRi = void 0),
			(this.GRi = void 0),
			(this.w5s = void 0),
			this.jRn.clear(),
			this.zRn.clear();
	}
	dde() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.MapOpenAreaChange,
			this.oUi,
		),
			EventSystem_1.EventSystem.Add(
				EventDefine_1.EEventName.MapOpenAreaFullUpdate,
				this.C5s,
			),
			(this.ORi = new LevelConditionRegistry_1.ConditionPassCallback(this.tUi));
		for (const e of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
			var i = e.ConditionId;
			0 < i &&
				LevelConditionRegistry_1.LevelConditionRegistry.RegisterConditionGroup(
					i,
					this.ORi,
				);
		}
	}
	Cde() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.MapOpenAreaChange,
			this.oUi,
		),
			EventSystem_1.EventSystem.Remove(
				EventDefine_1.EEventName.MapOpenAreaFullUpdate,
				this.C5s,
			);
		for (const e of ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfigList()) {
			var i = e.ConditionId;
			0 < i &&
				LevelConditionRegistry_1.LevelConditionRegistry.UnRegisterConditionGroup(
					i,
					this.ORi,
				);
		}
	}
	GetMapTiles() {
		return this.qRi;
	}
	OnMapSetUp() {
		1 === this.PRi && this.YRi !== MapDefine_1.BIG_WORLD_MAP_ID
			? (this.eUi = !1)
			: ((this.eUi = !0),
				this.hUi(),
				this.lUi(),
				ConfigManager_1.ConfigManager.MapConfig?.GetMultiMapAreaConfigList()?.forEach(
					(i) => {
						this.jRn.set(i.Block, i);
					},
				),
				ConfigManager_1.ConfigManager.MapConfig?.GetAllSubMapConfig()?.forEach(
					(i) => {
						i.Area.forEach((e) => {
							this.zRn.set(e, i.Id);
						});
					},
				),
				(this.KRi = Number.MAX_SAFE_INTEGER),
				(this.QRi = Number.MAX_SAFE_INTEGER));
	}
	_Ui(i, e) {
		return 1 === this.PRi ? e : i;
	}
	hUi() {
		for (var [i] of ((this.OpenArea = new Set()),
		ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas()))
			this.OpenArea.add(i);
	}
	lUi() {
		var i = ConfigManager_1.ConfigManager.MapConfig.GetAllTileConfig();
		this.ARi.splice(0, this.ARi.length);
		for (const o of i)
			if (!StringUtils_1.StringUtils.IsEmpty(o.MapTilePath)) {
				var e = ModelManager_1.ModelManager.MapModel.CheckUnlockMapBlockIds(
						o.Block,
					),
					t = (t = o.MapTilePath.split("/"))[t.length - 1];
				let i = "",
					r = "";
				r =
					0 !== e
						? ((e =
								ConfigManager_1.ConfigManager.MapConfig.GetUnlockMapTileConfigById(
									e,
								)),
							(i =
								ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
									e.MapTilePath,
								)),
							ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
								e.MiniMapTilePath,
							))
						: ((i =
								ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
									o.MapTilePath,
								)),
							ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
								o.MiniMapTilePath,
							));
				e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					o.HdMapTilePath,
				);
				var a = this._Ui(i, r),
					s = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
						o.FogTilePath,
					),
					n = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
						o.MiniFogTilePath,
					);
				s = this._Ui(s, n);
				this.ARi.push({
					MapTilePath: a,
					HdMapTilePath: e,
					FogTilePath: s,
					MapTileName: t,
				});
			}
		let o = 0,
			r = 0;
		if (1 === this.PRi) {
			(o = 4), (this.GRi.length = 0), this.GRi.push(this.jRi);
			for (let i = 1; i < o; ++i) {
				var h = LguiUtil_1.LguiUtil.CopyItem(this.jRi, this.HRi);
				this.GRi.push(h);
			}
		} else {
			this.xRi = { MaxX: -1, MinX: 1, MaxY: -1, MinY: 1 };
			for (const i of this.ARi) {
				var M = (l = this.bRi(i.MapTileName)).X,
					l = l.Y;
				(this.xRi.MaxX = Math.max(M, this.xRi.MaxX)),
					(this.xRi.MinX = Math.min(M, this.xRi.MinX)),
					(this.xRi.MaxY = Math.max(l, this.xRi.MaxY)),
					(this.xRi.MinY = Math.min(l, this.xRi.MinY));
			}
			(r = this.xRi.MaxX - this.xRi.MinX + 1 + 4),
				(o = r * (i = this.xRi.MaxY - this.xRi.MinY + 1 + 4));
		}
		(this.qRi.length = 0), this.qRi.push(this.VRi);
		for (let i = 1; i < o; ++i) {
			var g = LguiUtil_1.LguiUtil.CopyItem(this.VRi, this.FRi);
			this.qRi.push(g);
		}
		var R = new Map();
		for (const i of this.ARi) {
			var _ = this.bRi(i.MapTileName);
			R.set(_.X + "_" + _.Y, i);
		}
		var f,
			C,
			E,
			p,
			A,
			T = Vector2D_1.Vector2D.Create();
		for (let i = 0; i < this.qRi.length; i++) {
			const e = this.qRi[i];
			if (
				(e.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
				e.SetHeight(MapDefine_1.DETAIL_TILE_SPACE),
				1 === this.PRi)
			)
				this.uUi(e);
			else {
				var I = i - ((d = Math.ceil((i + 1) / r)) - 1) * r + this.xRi.MinX - 2,
					d = -(d - 1) + this.xRi.MaxY + 2;
				(T.X = (I - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
					(T.Y = (d - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
					e.SetAnchorOffset(T.ToUeVector2D());
				const t = R.get(I + "_" + d);
				t &&
					((I = (i) => {
						e.SetTexture(i),
							StringUtils_1.StringUtils.IsEmpty(t.FogTilePath)
								? e.SetColor(this.WRi)
								: this.cUi(e, t.FogTilePath);
					}),
					e.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 0),
					GlobalData_1.GlobalData.IsPlayInEditor &&
						e.GetOwner()?.SetActorLabel(t.MapTileName),
					t && !StringUtils_1.StringUtils.IsEmpty(t.MapTilePath)
						? ((d = this.wRi.get(t.MapTilePath))
								? I(d)
								: ResourceSystem_1.ResourceSystem.LoadAsync(
										t.MapTilePath,
										UE.Texture,
										I,
										102,
									),
							ModelManager_1.ModelManager.PlatformModel.IsPc() &&
								!StringUtils_1.StringUtils.IsEmpty(t.HdMapTilePath) &&
								2 === this.PRi &&
								((d = (i) => {
									e.SetCustomMaterialScalarParameter(HD_SCALAR_NAME, 1),
										e.SetCustomMaterialTextureParameter(HD_TEXTURE_NAME, i);
								}),
								this.wRi.has(t.HdMapTilePath)
									? d(this.wRi.get(t.HdMapTilePath))
									: ResourceSystem_1.ResourceSystem.LoadAsync(
											t.HdMapTilePath,
											UE.Texture,
											d,
											102,
										)))
						: (e.SetTexture(void 0), e.SetColor(this.WRi)));
			}
		}
		this.iUi(),
			1 !== this.PRi &&
				((i = this.xRi.MaxX),
				(f = 1 - this.xRi.MinX),
				(C = Math.max(i, f)),
				(E = this.xRi.MaxY),
				(p = 1 - this.xRi.MinY),
				(A = Math.max(E, p)),
				this.kRi.SetWidth(2 * C * MapDefine_1.DETAIL_TILE_REALSIZE),
				this.kRi.SetHeight(2 * A * MapDefine_1.DETAIL_TILE_REALSIZE),
				this.MapOffset.Set(
					Math.max(0, i - f) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
					Math.max(0, f - i) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
					Math.max(0, p - E) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
					Math.max(0, E - p) * MapDefine_1.DETAIL_TILE_REALSIZE * 2,
				),
				(this.FakeOffset = 2 * MapDefine_1.DETAIL_TILE_REALSIZE));
	}
	bRi(i) {
		return (
			(i = i.split("_")),
			{
				X: UE.KismetStringLibrary.Conv_StringToInt(i[2]),
				Y: UE.KismetStringLibrary.Conv_StringToInt(i[3]),
			}
		);
	}
	cUi(i, e, t = !1, a) {
		const s = i;
		i = (i) => {
			i ? this.uUi(s, i, t) : s.SetColor(this.WRi), a && a();
		};
		var n = this.wRi.get(e);
		n ? i(n) : ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.Texture, i, 102);
	}
	async iUi() {
		this.NRi && (this.NRi.GetOwner()?.K2_DestroyActor(), (this.NRi = void 0));
		var i = ModelManager_1.ModelManager.MapModel.GetCurMapBorderId();
		(i =
			ConfigManager_1.ConfigManager.MapConfig.GetMapBorderConfig(i).PrefabPath),
			(i = await LguiUtil_1.LguiUtil.LoadPrefabByAsync(i, this.kRi));
		(this.NRi = i.GetComponentByClass(UE.UIItem.StaticClass())),
			this.NRi.SetAnchorOffset(new UE.Vector2D(0, 0));
	}
	UpdateMinimapTiles(i) {
		if (1 === this.PRi && this.eUi) {
			var e = (t = MapUtil_1.MapUtil.GetTilePosition(i, 0.5)).X,
				t = t.Y,
				a = ModelManager_1.ModelManager.AreaModel.GetCurrentAreaId(),
				s = this.zRn.has(a) ? this.zRn.get(a) : 0,
				n = this.ZRn !== s;
			if (
				!(
					Math.abs(this.XRi - i.X) <
						MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
					Math.abs(this.$Ri - i.Y) <
						MapDefine_1.MINI_MAP_UPDATE_GAP * MapDefine_1.UNIT &&
					this.KRi === e &&
					this.QRi === t
				) ||
				n
			) {
				var o = [e, t, e - 1, t, e, t - 1, e - 1, t - 1],
					r = this.J6s(i, e, t),
					h = (this.z6s(this.qRi, o, r), 0 !== s && void 0 !== this.HRi);
				if (h) {
					this.z6s(this.GRi, o, r);
					for (let i = 0; i < this.GRi.length; i++) {
						var M = o[2 * i],
							l = o[2 * i + 1];
						if (0 < r[i].R) {
							(M =
								(M - 0.5 - 0.5 + r[i].B + r[i].R / 2) *
								MapDefine_1.DETAIL_TILE_SPACE),
								(l =
									(l - 0.5 + 0.5 - r[i].A - r[i].G / 2) *
									MapDefine_1.DETAIL_TILE_SPACE),
								this.Y6s?.SetAnchorOffset(new UE.Vector2D(M, l));
							break;
						}
					}
				}
				if ((this.HRi?.SetUIActive(h), this.KRi !== e || this.QRi !== t || n)) {
					(this.KRi = e), (this.QRi = t);
					for (let i = 0; i < this.qRi.length; i++) {
						var g = o[2 * i],
							R = o[2 * i + 1];
						h && this.Z6s(this.GRi[i], g, R, s, a), this.V8s(this.qRi[i], g, R);
					}
					h
						? EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.WorldMapSubMapChanged,
								s,
							)
						: EventSystem_1.EventSystem.Emit(
								EventDefine_1.EEventName.WorldMapSubMapChanged,
								0,
							),
						(this.ZRn = s ?? 0);
				}
			}
		}
	}
	Z6s(i, e, t, a, s) {
		var n = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
			e.toString() + "_" + t.toString(),
			!0,
		);
		if (n && !StringUtils_1.StringUtils.IsEmpty(n.MapTilePath)) {
			var o = ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigById(a);
			if (
				o &&
				((o = o.MiniMapTilePath.find((i) => i.includes(e + "_" + t))), o)
			)
				if (
					((o =
						ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
					StringUtils_1.StringUtils.IsEmpty(o))
				)
					Log_1.Log.CheckError() &&
						Log_1.Log.Error(
							"Map",
							35,
							"UpdateMinimapTiles 多层地图小地图获取地图块资源为空",
							["x", e],
							["y", t],
							["MultiMapId", a],
							["AreaId", s],
						);
				else {
					(a = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
						n.MiniFogTilePath,
					)),
						(s = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
							n.FogTilePath,
						));
					const e = this._Ui(s, a);
					ResourceSystem_1.ResourceSystem.LoadAsync(o, UE.Texture, (t) => {
						t &&
							(i.SetTexture(t),
							StringUtils_1.StringUtils.IsEmpty(e)
								? i.SetColor(this.WRi)
								: this.cUi(i, e, !0));
					});
				}
		}
	}
	V8s(i, e, t) {
		if (
			(e = ConfigManager_1.ConfigManager.MapConfig.GetTileConfig(
				e.toString() + "_" + t.toString(),
				!0,
			)) &&
			!StringUtils_1.StringUtils.IsEmpty(e.MapTilePath)
		) {
			t = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
				e.MapTilePath,
			);
			var a = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					e.MiniMapTilePath,
				),
				s = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
					e.FogTilePath,
				);
			(e = ConfigManager_1.ConfigManager.MapConfig.GetUiResourcePathById(
				e.MiniFogTilePath,
			)),
				(t = this._Ui(t, a));
			const n = this._Ui(s, e);
			ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.Texture, (e) => {
				e?.IsValid() &&
					(i.SetTexture(e),
					StringUtils_1.StringUtils.IsEmpty(n)
						? i.SetColor(this.WRi)
						: this.cUi(i, n));
			});
		}
	}
	J6s(i, e, t) {
		(a = Vector2D_1.Vector2D.Create(i)).DivisionEqual(
			MapDefine_1.DETAIL_TILE_REALSIZE * MapDefine_1.UNIT,
		),
			(e = a.X - e + 1);
		var a = a.Y + t,
			s =
				((t =
					((this.XRi = i.X),
					(this.$Ri = i.Y),
					MapDefine_1.MINI_MAP_RADIUS / MapDefine_1.DETAIL_TILE_REALSIZE)),
				(i = Math.min(e + t, 1)),
				Math.max(e - t, 0)),
			n = Math.min(a + t, 1),
			o = Math.max(a - t, 0);
		return [
			(i = new UE.LinearColor(i - s, n - o, s, o)),
			(n = new UE.LinearColor(2 * t - i.R, i.G, Math.min(1 - t + e, 1), o)),
			(e = new UE.LinearColor(i.R, 2 * t - i.G, s, Math.max(a - t - 1, 0))),
			new UE.LinearColor(n.R, e.G, n.B, e.A),
		];
	}
	z6s(i, e, t) {
		var a = Vector2D_1.Vector2D.Create();
		for (let r = 0; r < i.length; r++) {
			var s = i[r],
				n =
					(s.SetWidth(Math.max(t[r].R * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
					s.SetHeight(Math.max(t[r].G * MapDefine_1.DETAIL_TILE_REALSIZE, 0)),
					e[2 * r]),
				o = e[2 * r + 1];
			(a.X =
				(n - 0.5 - 0.5 + t[r].B + t[r].R / 2) * MapDefine_1.DETAIL_TILE_SPACE),
				(a.Y =
					(o - 0.5 + 0.5 - t[r].A - t[r].G / 2) *
					MapDefine_1.DETAIL_TILE_SPACE),
				s.SetAnchorOffset(a.ToUeVector2D()),
				s.SetCustomMaterialVectorParameter(new UE.FName("UVCorrect"), t[r]);
		}
	}
	ShowSubMapByPosition(i, e, t = !1) {
		var a;
		1 === this.PRi ||
			0 === i ||
			((a = this.HRi?.IsUIActiveInHierarchy()),
			this.CreateSubMapTile(i, -e, a),
			this.HRi?.SetUIActive(!0),
			a) ||
			this.N5s(!1, void 0, t);
	}
	HideSubMap() {
		this.HRi?.IsUIActiveInHierarchy()
			? (this.w5s.forEach((i) => {
					this.k5s(i, !1);
				}),
				this.N5s(!0, () => {
					this.HRi?.SetUIActive(!1);
				}))
			: this.HRi?.SetUIActive(!1);
	}
	N5s(i = !1, e, t = !1) {
		var a = this.b5s?.GetPlayTween();
		a &&
			(this.O5s(),
			this.b5s.Stop(),
			(a.from = i ? this.q5s : 0),
			(a.to = i ? 0 : this.q5s),
			(a.duration = t ? 0 : 0.2),
			e &&
				((i = (0, puerts_1.toManualReleaseDelegate)(e)),
				(this.G5s = a.RegisterOnComplete(i))),
			this.b5s.Play());
	}
	O5s() {
		void 0 !== this.G5s &&
			((this.b5s?.GetPlayTween()).UnregisterOnComplete(this.G5s),
			(this.G5s = void 0));
	}
	k5s(i, e = !0) {
		var t,
			a,
			s = this.b5s?.GetPlayTween();
		s &&
			((a = (t = i
				.GetOwner()
				.GetComponentByClass(
					UE.LGUIPlayTweenComponent.StaticClass(),
				))?.GetPlayTween()),
			t.Stop(),
			(a.duration = s.duration - 0.25 * s.duration),
			(a.from = e ? 0 : i.GetAlpha()),
			(a.to = e ? i.GetAlpha() : 0),
			t.Play());
	}
	F5s(i, e = !0) {
		i = i
			.GetOwner()
			.GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
		var t = i?.GetPlayTween();
		i.Stop(), (t.duration = e ? 0.3 : 0.15), i.Play();
	}
	GetSubMapFloorCountByGroupId(i) {
		return 0 === i
			? 0
			: ConfigManager_1.ConfigManager.MapConfig.GetSubMapConfigByGroupId(i)
					.length;
	}
	GetSubMapGroupByRootItemPosition() {
		if (
			(i = UE.LGUIBPLibrary.SimulationLineTraceOnCenterScreen(
				GlobalData_1.GlobalData.World,
				this.U4s,
			)) &&
			i.enterComponent
		) {
			var i,
				e = this.kRi.GetWidth(),
				t = this.kRi.GetHeight(),
				a =
					0 <= (i = i.GetLocalPointInPlane()).X
						? Math.ceil(i.X / MapDefine_1.DETAIL_TILE_SPACE)
						: Math.floor(i.X / MapDefine_1.DETAIL_TILE_SPACE),
				s =
					0 <= i.Y
						? Math.floor(i.Y / MapDefine_1.DETAIL_TILE_SPACE)
						: Math.ceil(i.Y / MapDefine_1.DETAIL_TILE_SPACE),
				n = (i.X + e / 2) % MapDefine_1.DETAIL_TILE_SPACE,
				o = (i.Y + t / 2) % MapDefine_1.DETAIL_TILE_SPACE,
				r = this.jRn.get(a + "_" + s);
			if (r)
				for (let i = 0; i < r?.MultiMapRangeList.length; i++) {
					var h = r?.MultiMapRangeList[i];
					for (let e = 0; e < h.ArrayInt.length; e += 4) {
						var M = h.ArrayInt[e],
							l = h.ArrayInt[e + 1],
							g = h.ArrayInt[e + 2],
							R = h.ArrayInt[e + 3];
						if (M <= n && n <= g && l <= o && o <= R) return r.MultiMapList[i];
					}
				}
		}
		return 0;
	}
	CreateSubMapTile(i, e, t = !1) {
		if (
			((this.w5s = []),
			(i = ConfigCommon_1.ConfigCommon.ToList(
				ConfigManager_1.ConfigManager.MapConfig?.GetSubMapConfigByGroupId(i),
			)))
		) {
			let o = 0;
			i.sort((i, t) =>
				i.Floor === e && t.Floor !== e
					? 1
					: i.Floor !== e && t.Floor === e
						? -1
						: i.Floor - t.Floor,
			);
			for (const r of i)
				for (const i of r.MapTilePath) {
					this.GRi &&
						!this.GRi[o] &&
						((a = LguiUtil_1.LguiUtil.CopyItem(this.jRi, this.HRi)),
						this.GRi.push(a)),
						o++;
					var a = i.split("_"),
						s = Number(a[2]),
						n = Number(a[3]);
					const h = this.GRi[o - 1];
					h.SetAnchorOffsetX((s - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
						h.SetAnchorOffsetY((n - 0.5) * MapDefine_1.DETAIL_TILE_SPACE),
						h.SetHierarchyIndex(o),
						h.SetWidth(MapDefine_1.DETAIL_TILE_SPACE),
						h.SetHeight(MapDefine_1.DETAIL_TILE_SPACE),
						(s =
							ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
								i,
							));
					const M = e === r.Floor ? 255 : 20 + 20 * o;
					ResourceSystem_1.ResourceSystem.LoadAsync(s, UE.Texture, (i) => {
						h.SetUIActive(!0),
							i
								? (h.SetColor(new UE.Color(M, M, M, 255)), h.SetTexture(i))
								: h.SetColor(this.WRi),
							t ? this.F5s(h, e === r.Floor) : this.k5s(h, !0),
							this.w5s.push(h);
					});
				}
			for (let i = o; i < this.GRi.length; i++) this.GRi[i].SetUIActive(!1);
		}
	}
	ConvertUiPositionToMapTilePosition(i) {
		return Vector2D_1.Vector2D.Create();
	}
	rUi() {
		for (const i of this.qRi) this.uUi(i);
		for (const i of this.GRi) this.uUi(i, void 0, !0);
	}
	HandleAreaOpen(i) {
		(this.zRi = []),
			this.JRi || (this.JRi = (0, puerts_1.toManualReleaseDelegate)(this.nUi));
		for (let a = 0; a < this.qRi.length; a++) {
			var e,
				t = this.qRi[a];
			void 0 !== (t = this.mUi(t, i)) &&
				(((e = new FogOpenParams()).MapTileIndex = a),
				(e.Channel = t),
				this.zRi.push(e));
		}
		this.nUi(0);
	}
	mUi(i, e) {
		if (
			i &&
			i.texture &&
			(i = i.texture.GetName()) !== MAP_TILE_COMMON &&
			((i = (i = this.bRi(i)).X + "_" + i.Y),
			(i = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(i)))
		)
			return e === i.R
				? 0
				: e === i.G
					? 1
					: e === i.B
						? 2
						: e === i.Alpha
							? 3
							: void 0;
	}
	sUi(i, e, t) {
		var a = i.GetColor().ReinterpretAsLinear();
		switch (e) {
			case 0:
				a.R = t;
				break;
			case 1:
				a.G = t;
				break;
			case 2:
				a.B = t;
				break;
			case 3:
				a.A = t;
		}
		i.SetColor(a.ToFColor(!0));
	}
	HandleDelegate() {
		var i;
		this.JRi &&
			((i = ConfigManager_1.ConfigManager.MapConfig.GetMapDissolveTime()),
			this.ZRi && this.ZRi.Kill(),
			(this.ZRi = UE.LTweenBPLibrary.FloatTo(
				GlobalData_1.GlobalData.World,
				this.JRi,
				0,
				1,
				i,
			)));
	}
	UnBindDelegate() {
		this.JRi &&
			((0, puerts_1.releaseManualReleaseDelegate)(this.nUi),
			(this.JRi = void 0)),
			this.ZRi && (this.ZRi.Kill(), (this.ZRi = void 0));
	}
	uUi(i, e, t = !1) {
		var a, s, n;
		i &&
			i.texture &&
			((n = i.texture.GetName()) !== MAP_TILE_COMMON &&
			((n = (n = this.bRi(n)).X + "_" + n.Y),
			(n = ConfigManager_1.ConfigManager.MapConfig.GetFogBlockConfig(n)))
				? (!t &&
						e?.IsValid() &&
						i.SetCustomMaterialTextureParameter(FOG_TEXTURE_NAME, e),
					(e = this.OpenArea.has(n.R) ? 255 : 0),
					(a = this.OpenArea.has(n.G) ? 255 : 0),
					(s = this.OpenArea.has(n.B) ? 255 : 0),
					(n = this.OpenArea.has(n.Alpha) ? 255 : 0),
					(255 !== e && 255 !== a && 255 !== s && 255 !== n) || !t
						? ((t = new UE.Color(e, a, s, n)), i.SetColor(t))
						: i.SetColor(new UE.Color(255, 255, 255, 255)))
				: i.SetColor(this.WRi));
	}
}
exports.MapTileMgr = MapTileMgr;
